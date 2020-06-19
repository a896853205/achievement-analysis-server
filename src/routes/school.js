// service
import schoolService from '../service/school-service';
import userService from '../service/user-service';
// 返回前台的对象
import Result from '../../util/response';

const router = require('koa-router')();

router.prefix('/school');

// 获得学校
router.post('/getSchool', async ctx => {
  // type 1院校优先
  //      2专业优先
  //      3指定院校
  let {
      type,
      lotId,
      natureValues,
      propertyValues,
      typeValues,
      areaFeatureValues,
      provinceListValues,
      gatherValue,
      schoolName,
      majorName
    } = ctx.request.body,
    user = ctx.state.data,
    schoolList = {
        schoolList: []
    };

  if (type === 1) {
    // 院校优先
      // 三批合并为二批
      if(lotId==4){
          let schoolList4 = await schoolService.getSchoolListByLotsScore({
              lotId,
              natureValues,
              propertyValues,
              typeValues,
              areaFeatureValues,
              provinceListValues,
              gatherValue,
              accountCategory: user.accountCategory,
              examYear: user.examYear,
              score: user.score
          });
          let schoolList6 = await schoolService.getSchoolListByLotsScore({
              lotId: 6,
              natureValues,
              propertyValues,
              typeValues,
              areaFeatureValues,
              provinceListValues,
              gatherValue,
              accountCategory: user.accountCategory,
              examYear: user.examYear,
              score: user.score
          });
          schoolList.schoolList = schoolList4.schoolList.concat(schoolList6.schoolList);
      }else {
          schoolList = await schoolService.getSchoolListByLotsScore({
              lotId,
              natureValues,
              propertyValues,
              typeValues,
              areaFeatureValues,
              provinceListValues,
              gatherValue,
              accountCategory: user.accountCategory,
              examYear: user.examYear,
              score: user.score
          });
      }

  } else if (type === 2) {
    // 专业优先
      // 三批合并为二批
      if(lotId == 4){
          let schoolList4 = await schoolService.getSchoolListByMajorName({
                  lotId,
                  natureValues,
                  propertyValues,
                  typeValues,
                  areaFeatureValues,
                  provinceListValues,
                  majorName,
                  score: user.score,
                  accountCategory: user.accountCategory,
                  examYear: user.examYear,
                  gatherValue
          });
          let schoolList6 = await schoolService.getSchoolListByMajorName({
              lotId: 6,
              natureValues,
              propertyValues,
              typeValues,
              areaFeatureValues,
              provinceListValues,
              majorName,
              score: user.score,
              accountCategory: user.accountCategory,
              examYear: user.examYear,
              gatherValue
          });
          schoolList.schoolList = schoolList4.schoolList.concat(schoolList6.schoolList);
      }else {
          schoolList = await schoolService.getSchoolListByMajorName({
              lotId,
              natureValues,
              propertyValues,
              typeValues,
              areaFeatureValues,
              provinceListValues,
              majorName,
              score: user.score,
              accountCategory: user.accountCategory,
              examYear: user.examYear,
              gatherValue
          });
      }
  } else if (type === 3) {
    // 指定院校
      // 三批合并为二批
      if(lotId == 4){
         let schoolList4 = await schoolService.getSchoolListBySchoolName({
              lotId,
              schoolName,
              score: user.score,
              accountCategory: user.accountCategory,
              examYear: user.examYear
          });
          let schoolList6 = await schoolService.getSchoolListBySchoolName({
              lotId: 6,
              schoolName,
              score: user.score,
              accountCategory: user.accountCategory,
              examYear: user.examYear
          });
          schoolList.schoolList = schoolList4.schoolList.concat(schoolList6.schoolList);
      } else {
          schoolList = await schoolService.getSchoolListBySchoolName({
              lotId,
              schoolName,
              score: user.score,
              accountCategory: user.accountCategory,
              examYear: user.examYear
          });
      }
  }

  if (schoolList.schoolList.length > 0) {
    ctx.body = new Result({
      data: schoolList
    });
  } else {
    ctx.body = new Result({
      data: schoolList,
      status: 1,
      msg: '没有符合筛选条件的学校'
    });
  }
});

// 获得专业
router.post('/getMajor', async ctx => {
  let { schoolId, lotId } = ctx.request.body,
    user = ctx.state.data,
    majorList = {
        majorList:[]
    };
    // 三批合并为二批
  // user = await userService.getUserInfo(user.uuid);
    if(lotId===4){
        console.log(lotId,'等于'+lotId+'进的');
        let majorList4 = await schoolService.getMajorList(
            schoolId,
            user.examYear,
            lotId,
            user.accountCategory,
            user.score
        );
        let majorList6 = await schoolService.getMajorList(
            schoolId,
            user.examYear,
            6,
            user.accountCategory,
            user.score
        );
        majorList.majorList = majorList4.majorList.concat(majorList6.majorList)
    }else {
        console.log(lotId,'等于'+lotId+'进来进来了');
        majorList = await schoolService.getMajorList(
            schoolId,
            user.examYear,
            lotId,
            user.accountCategory,
            user.score
        );
    }

  ctx.body = new Result({
    data: majorList
  });
});

router.post('/getSchoolDetail', async ctx => {
  let { schoolId } = ctx.request.body;

  let schoolDetail = await schoolService.getSchoolDetail(schoolId);

  ctx.body = new Result({
    data: schoolDetail
  });
});

router.post('/searchSchool', async ctx => {
  let {
    natureValues,
    propertyValues,
    typeValues,
    areaFeatureValues,
    schoolName,
    page
  } = ctx.request.body;

  let schoolList = await schoolService.getSchoolList({
    natureValues,
    propertyValues,
    typeValues,
    areaFeatureValues,
    schoolName,
    page
  });

  ctx.body = new Result({
    data: schoolList
  });
});

router.post('/getSchoolScoreList', async ctx => {
  const { schoolId, accountCategory } = ctx.request.body;

  let schoolScoreList = await schoolService.getSchoolScores(
    schoolId,
    accountCategory
  );

  ctx.body = new Result({
    data: schoolScoreList
  });
});

/**
 * 根据学校id查询招生简章等信息
 */
router.post('/getEnrollmentGuideNews', async ctx => {
  const { schoolId } = ctx.request.body;

  let schoolEnrollment = await schoolService.selectSchoolEnrollmentGuideNewsById(
    schoolId
  );

  ctx.body = new Result({
    data: schoolEnrollment
  });
});

/**
 * 根据招生简章的uuid查询招生简章
 */
router.post('/getEnrollmentGuideNewsDetail', async ctx => {
  const { uuid } = ctx.request.body;

  let enrollmentGuideNewsDetail = await schoolService.selectEnrollmentGuideNewsDetail(
    uuid
  );

  ctx.body = new Result({
    data: enrollmentGuideNewsDetail
  });
});

/**
 * 根据id查询学校排名
 */
router.post('/getSchoolRank', async ctx => {
  const { schoolId } = ctx.request.body;

  let schoolRank = await schoolService.selectSchoolRankById(schoolId);

  ctx.body = new Result({
    data: schoolRank
  });
});

/**
 * 小程序获取学校列表
 */
router.post('/miniAppGetSchool', async ctx => {
  let {
    lotId,
    gatherValue,
    examYear,
    score,
    accountCategory
  } = ctx.request.body;

  let { schoolList } = await schoolService.getSchoolListByLotsScore({
    lotId,
    natureValues: [],
    propertyValues: [],
    typeValues: [],
    areaFeatureValues: [],
    provinceListValues: [],
    gatherValue,
    accountCategory,
    examYear,
    score
  });

  ctx.body = new Result({
    data: schoolList.slice(0, 3)
  });
});

// 学校推荐列表
router.post('/getSchoolRecommendList', async ctx => {
  let schoolRecommendList = await schoolService.querySchoolRecommend();

  ctx.body = new Result({
    data: schoolRecommendList
  });
});

export default router;
