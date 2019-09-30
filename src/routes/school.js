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
      gatherValue,
      schoolName,
      majorName
    } = ctx.request.body,
    user = ctx.state.data,
    schoolList = [];

  if (type === 1) {
    // 院校优先
    // 如果有lotsid说明是有成绩和批次的判断出五种类型
    if (lotId) {
      schoolList = await schoolService.getSchoolListByLotsScore({
        lotId,
        natureValues,
        propertyValues,
        typeValues,
        areaFeatureValues,
        gatherValue,
        accountCategory: user.accountCategory,
        examYear: user.examYear,
        score: user.score
      });
    } else {
      // 直接进行四种选项的筛选,没有分数和批次的分类.
      schoolList = await schoolService.getSchoolList({
        natureValues,
        propertyValues,
        typeValues,
        areaFeatureValues
      });
    }
  } else if (type === 2) {
    // 专业优先
    schoolList = await schoolService.getSchoolListByMajorName({
      lotId,
      majorName,
      score: user.score,
      accountCategory: user.accountCategory,
      examYear: user.examYear
    });
  } else if (type === 3) {
    // 指定院校
    schoolList = await schoolService.getSchoolListBySchoolName({
      lotId,
      schoolName,
      score: user.score,
      accountCategory: user.accountCategory,
      examYear: user.examYear
    });
  }

  ctx.body = new Result({
    data: schoolList
  });
});

// 获得专业
router.post('/getMajor', async ctx => {
  let { schoolId, lotId } = ctx.request.body,
    user = ctx.state.data,
    majorList = [];

  user = await userService.getUserInfo(user.uuid);
  majorList = await schoolService.getMajorList(schoolId, user.examYear, lotId);

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

// 获取批次

export default router;
