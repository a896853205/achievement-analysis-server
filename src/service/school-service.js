// dao
import schoolDao from '../dao/school-dao';
import controlScoreRangeDao from '../dao/control-score-range-dao';
import { PAGE_SCHOOL } from '../constants/api-constants';
// 筛选算法
import {
  filtrateNatureSchool,
  filtratePropertySchool,
  filtrateTypeSchool,
  filtrateAreaFeatureSchool,
  filtrateProvinceSchool,
  filtrateMajorName,
  splitSchoolByRange,
  culEnrollRateStrategies,
  culRiskRateStrategies
} from './school-filtrate';

import {
  proxyParseToOldScore,
  culLineDifferStrategies,
  bindScoreAndRank,
  calScoreTransformRank
} from './rank-filtrate';

/**
 * 学校例子
 * {     lot_id: 1,
    //   score: 590,
    //   year: 2019,
    //   gender: 0,
    //   poverty: null,
    //   lot_name: '提前批',
    //   school_id: 1,
    //   school_code: '10214',
    //   school_name: '哈理工',
    //   province_id: 10,
    //   province_name: '黑龙江',
    //   school_nature_id: [ 1 ],
    //   school_nature_name: [ '公办' ],
    //   area_feature_id: [ 1, 7 ],
    //   area_feature_name: [ '沿海城市', '东北' ],
    //   school_property_id: [ 1, 2 ],
    //   school_property_name: [ '985', '211' ],
    //   school_type_id: [ 12, 13 ],
    //   school_type_name: [ '理工类', '综合类' ],
    //   gather: 'a' },]

    // 专业的表
    // [ RowDataPacket {
    //   lot_id: 1,
    //   score: 590,
    //   year: 2019,
    //   gender: 0,
    //   poverty: null,
    //   lot_name: '提前批',
    //   school_id: 1,
    //   school_code: '10214',
    //   school_name: '哈理工',
    //   province_id: 10,
    //   province_name: '黑龙江',
    //   school_nature_id: 1,
    //   school_nature_name: '公办',
    //   area_feature_id: 1,
    //   area_feature_name: '沿海城市',
    //   school_property_id: 1,
    //   school_property_name: '985',
    //   school_type_id: 12,
    //   school_type_name: '理工类',
    //   major_id: 1,
    //   major_name: '农学' },
 */
export default {
  // 获取所有学校通过批次id
  getSchoolListByLotsScore: async ({
    lotId,
    natureValues,
    propertyValues,
    typeValues,
    areaFeatureValues,
    provinceListValues,
    accountCategory,
    examYear,
    score,
    gatherValue
  }) => {
    let [
      resultSchoolList,
      { currentRank, oldRank, oldTwoRank, oldThreeRank },
      scoreRange,
      { currentLotsScore, oldOneLotsScore, oldTwoLotsScore, oldThreeLotsScore }
    ] = await Promise.all([
      schoolDao.querySchoolByLotIdAndAccountCategory(
        lotId,
        accountCategory,
        examYear
      ),
      schoolDao.queryScoreRankByCategoryAndYear(accountCategory, examYear),
      controlScoreRangeDao.queryScoreRangeByLotsId(lotId),
      schoolDao.queryLotsScore(examYear, accountCategory)
    ]);

    // 对办学性质进行筛选
    resultSchoolList = filtrateNatureSchool(natureValues, resultSchoolList);

    // 对学校属性进行筛选
    resultSchoolList = filtratePropertySchool(propertyValues, resultSchoolList);

    // 对高校类别进行筛选
    resultSchoolList = filtrateTypeSchool(typeValues, resultSchoolList);

    // 对地域特色进行筛选
    resultSchoolList = filtrateAreaFeatureSchool(
      areaFeatureValues,
      resultSchoolList
    );

    // 对所在省份进行筛选
    resultSchoolList = filtrateProvinceSchool(
      provinceListValues,
      resultSchoolList
    );

    // 将新的成绩转化为去年的成绩,加上集合tag
    let [oldOneScoreAndRank] = proxyParseToOldScore(
      score,
      currentRank,
      oldRank,
      oldTwoRank,
      oldThreeRank
    );
    resultSchoolList = splitSchoolByRange(
      oldOneScoreAndRank.score,
      scoreRange,
      resultSchoolList,
      gatherValue,
      examYear - 1
    );

    // 把学校的位次和线差也加上
    resultSchoolList = bindScoreAndRank({
      resultList: resultSchoolList,
      lotId,
      examYear,
      // 计算三年分数和位次
      currentRank,
      oldRank,
      oldTwoRank,
      oldThreeRank,
      // 计算三年线差
      oldOneLotsScore,
      oldTwoLotsScore,
      oldThreeLotsScore
    });

    // 计算提档概率
    resultSchoolList = culEnrollRateStrategies[lotId]({
      stuOldOneScoreAndRank: oldOneScoreAndRank,
      culList: resultSchoolList,
      examYear,
      stuLineDiffer: culLineDifferStrategies[lotId](score, oldOneLotsScore)
    });

    // 计算风险系数
    resultSchoolList = culRiskRateStrategies[lotId]({
      culList: resultSchoolList,
      examYear
    });

    // 删除前端不使用的数据
    for (let schoolItem of resultSchoolList) {
      delete schoolItem.major;
    }

    return {
      schoolList: resultSchoolList
    };
  },

  // 获取所有学校通过学校名
  getSchoolListBySchoolName: async ({
    lotId,
    schoolName,
    score,
    accountCategory,
    examYear
  }) => {
    let [
      resultSchoolList,
      { currentRank, oldRank, oldTwoRank, oldThreeRank },
      scoreRange,
      { currentLotsScore, oldOneLotsScore, oldTwoLotsScore, oldThreeLotsScore }
    ] = await Promise.all([
      schoolDao.querySchoolByLotIdAndNameAndAccountCategory(
        lotId,
        schoolName,
        accountCategory
      ),
      schoolDao.queryScoreRankByCategoryAndYear(accountCategory, examYear),
      controlScoreRangeDao.queryScoreRangeByLotsId(lotId),
      schoolDao.queryLotsScore(examYear, accountCategory)
    ]);

    // 将新的成绩转化为去年的成绩,加上集合tag
    let [oldOneScoreAndRank] = proxyParseToOldScore(
      score,
      currentRank,
      oldRank
    );
    resultSchoolList = splitSchoolByRange(
      oldOneScoreAndRank.score,
      scoreRange,
      resultSchoolList,
      undefined,
      examYear - 1
    );

    // 把学校的位次和线差也加上
    resultSchoolList = bindScoreAndRank({
      resultList: resultSchoolList,
      lotId,
      examYear,
      // 计算三年分数和位次
      currentRank,
      oldRank,
      oldTwoRank,
      oldThreeRank,
      // 计算三年线差
      oldOneLotsScore,
      oldTwoLotsScore,
      oldThreeLotsScore
    });

    // 计算提档概率
    resultSchoolList = culEnrollRateStrategies[lotId]({
      stuOldOneScoreAndRank: oldOneScoreAndRank,
      culList: resultSchoolList,
      examYear,
      stuLineDiffer: culLineDifferStrategies[lotId](score, oldOneLotsScore)
    });

    // 计算风险系数
    resultSchoolList = culRiskRateStrategies[lotId]({
      culList: resultSchoolList,
      examYear
    });

    return {
      schoolList: resultSchoolList
    };
  },

  // 查询学校列表通过专业名
  getSchoolListByMajorName: async ({
    lotId,
    majorName,
    score,
    accountCategory,
    examYear
  }) => {
    let [
      resultSchoolList,
      originalSchoolList,
      { currentRank, oldRank, oldTwoRank, oldThreeRank },
      scoreRange,
      { currentLotsScore, oldOneLotsScore, oldTwoLotsScore, oldThreeLotsScore }
    ] = await Promise.all([
      schoolDao.querySchoolByLotIdAndAccountCategory(
        lotId,
        accountCategory,
        examYear
      ),
      schoolDao.querySchoolWithMajorByLotIdAndAccountCategory(
        lotId,
        accountCategory
      ),
      schoolDao.queryScoreRankByCategoryAndYear(accountCategory, examYear),
      controlScoreRangeDao.queryScoreRangeByLotsId(lotId),
      schoolDao.queryLotsScore(examYear, accountCategory)
    ]);

    // 通过专业名字筛学校
    resultSchoolList = filtrateMajorName({
      originalSchoolList,
      majorName,
      resultSchoolList
    });

    // 将新的成绩转化为去年的成绩,加上集合tag
    let [oldOneScoreAndRank] = proxyParseToOldScore(
      score,
      currentRank,
      oldRank,
      oldTwoRank,
      oldThreeRank
    );
    resultSchoolList = splitSchoolByRange(
      oldOneScoreAndRank.score,
      scoreRange,
      resultSchoolList,
      undefined,
      examYear - 1
    );

    // 把学校的位次和线差也加上
    resultSchoolList = bindScoreAndRank({
      resultList: resultSchoolList,
      lotId,
      examYear,
      // 计算三年分数和位次
      currentRank,
      oldRank,
      oldTwoRank,
      oldThreeRank,
      // 计算三年线差
      oldOneLotsScore,
      oldTwoLotsScore,
      oldThreeLotsScore
    });

    // 计算提档概率
    resultSchoolList = culEnrollRateStrategies[lotId]({
      stuOldOneScoreAndRank: oldOneScoreAndRank,
      culList: resultSchoolList,
      examYear,
      stuLineDiffer: culLineDifferStrategies[lotId](score, oldOneLotsScore)
    });

    // 计算风险系数
    resultSchoolList = culRiskRateStrategies[lotId]({
      culList: resultSchoolList,
      examYear
    });

    // 删除前端不使用的数据
    for (let schoolItem of resultSchoolList) {
      delete schoolItem.major;
    }

    return {
      schoolList: resultSchoolList
    };
  },

  // 获取所有学校的详细信息
  getSchoolList: async ({
    natureValues,
    propertyValues,
    typeValues,
    areaFeatureValues,
    schoolName,
    page
  }) => {
    let resultSchoolList = await schoolDao.querySchool(schoolName);

    // 对办学性质进行筛选
    resultSchoolList = filtrateNatureSchool(natureValues, resultSchoolList);

    // 对学校属性进行筛选
    resultSchoolList = filtratePropertySchool(propertyValues, resultSchoolList);

    // 对高校类别进行筛选
    resultSchoolList = filtrateTypeSchool(typeValues, resultSchoolList);

    // 对地域特色进行筛选
    resultSchoolList = filtrateAreaFeatureSchool(
      areaFeatureValues,
      resultSchoolList
    );

    return {
      schoolList: resultSchoolList.slice(
        (page - 1) * PAGE_SCHOOL,
        (page - 1) * PAGE_SCHOOL + PAGE_SCHOOL
      ),
      totalSchool: resultSchoolList.length
    };
  },

  // 模拟获取专业
  getMajorList: async (schoolId, examYear, lotId, accountCategory, score) => {
    // 通过schoolID 和 当前年份 获取专业
    let [
      majorList,
      { currentRank, oldRank, oldTwoRank, oldThreeRank },
      { currentLotsScore, oldOneLotsScore, oldTwoLotsScore, oldThreeLotsScore }
    ] = await Promise.all([
      schoolDao.queryMajorBySchoolId(schoolId, lotId, examYear),
      schoolDao.queryScoreRankByCategoryAndYear(accountCategory, examYear),
      schoolDao.queryLotsScore(examYear, accountCategory)
    ]);

    let [oldOneScoreAndRank] = proxyParseToOldScore(
      score,
      currentRank,
      oldRank,
      oldTwoRank,
      oldThreeRank
    );

    // 把专业的位次和线差也加上
    majorList = bindScoreAndRank({
      resultList: majorList,
      lotId,
      examYear,
      // 计算三年分数和位次
      currentRank,
      oldRank,
      oldTwoRank,
      oldThreeRank,
      // 计算三年线差
      oldOneLotsScore,
      oldTwoLotsScore,
      oldThreeLotsScore
    });

    // 计算提档概率
    majorList = culEnrollRateStrategies[lotId]({
      stuOldOneScoreAndRank: oldOneScoreAndRank,
      culList: majorList,
      examYear,
      stuLineDiffer: culLineDifferStrategies[lotId](score, oldOneLotsScore)
    });

    // 计算风险系数
    majorList = culRiskRateStrategies[lotId]({
      culList: majorList,
      examYear
    });

    return {
      majorList
    };
  },

  getSchoolDetail: async schoolId => {
    let schoolDetail = await schoolDao.selectSchoolDetail(schoolId);

    return schoolDetail;
  },
  // 通过学校的id和科目类型查询出历年分数
  getSchoolScores: async (fk_school_id, accountCategory) => {
    let [schoolList, lotsList] = await Promise.all([
        schoolDao.querySchoolScores(fk_school_id, accountCategory),
        schoolDao.selectSchoolLots()
      ]),
      schoolScoreList = [],
      scoreAndRankDao = [];

    for (let item of schoolList) {
      let {
          fk_lots_id,
          score,
          year,
          gender,
          poverty,
          enrollment,
          maxScore
        } = item,
        { lots_name, gradation } = lotsList.find(
          lotsItem => lotsItem.id === fk_lots_id
        );

      scoreAndRankDao.push(
        schoolDao.queryLotsScoreByCurrentYear(year, accountCategory)
      );

      schoolScoreList.push({
        score,
        year,
        gender,
        poverty,
        enrollment,
        lotsName: lots_name,
        gradation,
        maxScore
      });
    }

    // 将当年的最低位次放在数组中
    let socreAndRank = await Promise.all(scoreAndRankDao);

    for (let i = 0; i < schoolScoreList.length; i++) {
      let fitCurrent = calScoreTransformRank(
        schoolScoreList[i].score,
        socreAndRank[i]
      );

      if (fitCurrent) {
        schoolScoreList[i].lastRank = fitCurrent.rank;
      }
    }

    return schoolScoreList;
  },

  /**
   * 返回招生简章的数组
   */
  selectSchoolEnrollmentGuideNewsById: async fk_school_id => {
    return await schoolDao.selectSchoolEnrollmentGuideNewsById(fk_school_id);
  },
  selectSchoolRankById: async id => {
    return await schoolDao.selectSchoolRankById(id);
  },
  selectEnrollmentGuideNewsDetail: async enrollmentGuideNewsUuid => {
    let guideNewsDetail = await schoolDao.selectEnrollmentGuideNewsDetail(
      enrollmentGuideNewsUuid
    );

    if (guideNewsDetail) {
      await schoolDao.updateAddEnrollmentGuideViews(enrollmentGuideNewsUuid);
    }

    return guideNewsDetail;
  }
};
