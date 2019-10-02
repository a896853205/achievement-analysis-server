// dao
import schoolDao from '../dao/school-dao';
import controlScoreRangeDao from '../dao/control-score-range-dao';

// 筛选算法
import {
  filtrateNatureSchool,
  filtratePropertySchool,
  filtrateTypeSchool,
  filtrateAreaFeatureSchool,
  filtrateMajorName,
  splitSchoolByRange,
  culEnrollRateStrategies,
  culRiskRateStrategies
} from './school-filtrate';

import {
  proxyParseToOldScore,
  culLineDifferStrategies,
  bindScoreAndRank
} from './rank-filtrate';

/**
 * 学校例子
 * { lot_id: 1,
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
    //   gather: 'a' },
    // { lot_id: 1,
    //   score: 600,
    //   year: 2019,
    //   gender: 0,
    //   poverty: null,
    //   lot_name: '提前批',
    //   school_id: 2,
    //   school_code: '10215',
    //   school_name: '工大',
    //   province_id: 10,
    //   province_name: '黑龙江',
    //   school_nature_id: [ 2 ],
    //   school_nature_name: [ '合作办学' ],
    //   area_feature_id: [ 4 ],
    //   area_feature_name: [ '华南' ],
    //   school_property_id: [ 1, 2 ],
    //   school_property_name: [ '985', '211' ],
    //   school_type_id: [ 16 ],
    //   school_type_name: [ '财经类' ],
    //   gather: 'd' } ]

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
      schoolDao.querySchoolByLotIdAndAccountCategory(lotId, accountCategory),
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
      resultSchoolList,
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
      schoolList: resultSchoolList,
      examYear,
      stuLineDiffer: culLineDifferStrategies[lotId](score, oldOneLotsScore)
    });

    // 计算风险系数
    resultSchoolList = culRiskRateStrategies[lotId]({
      schoolList: resultSchoolList,
      examYear
    })

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
      resultSchoolList,
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
      schoolList: resultSchoolList,
      examYear,
      stuLineDiffer: culLineDifferStrategies[lotId](score, oldOneLotsScore)
    });

    // 计算风险系数
    resultSchoolList = culRiskRateStrategies[lotId]({
      schoolList: resultSchoolList,
      examYear
    })

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
      scoreRange
    ] = await Promise.all([
      schoolDao.querySchoolByLotIdAndAccountCategory(lotId, accountCategory),
      schoolDao.querySchoolWithMajorByLotIdAndAccountCategory(
        lotId,
        accountCategory
      ),
      schoolDao.queryScoreRankByCategoryAndYear(accountCategory, examYear),
      controlScoreRangeDao.queryScoreRangeByLotsId(lotId)
    ]);

    // 通过专业名字筛学校
    resultSchoolList = filtrateMajorName({
      originalSchoolList,
      majorName,
      resultSchoolList
    })

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
      resultSchoolList,
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
      schoolList: resultSchoolList,
      examYear,
      stuLineDiffer: culLineDifferStrategies[lotId](score, oldOneLotsScore)
    });

    // 计算风险系数
    resultSchoolList = culRiskRateStrategies[lotId]({
      schoolList: resultSchoolList,
      examYear
    })

    return {
      schoolList
    };
  },

  // 获取所有学校的详细信息
  getSchoolList: async ({
    natureValues,
    propertyValues,
    typeValues,
    areaFeatureValues
  }) => {
    let resultSchoolList = await schoolDao.querySchool();

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
      schoolList: resultSchoolList
    };
  },

  // 模拟获取专业
  getMajorList: async (schoolId, examYear, lotId) => {
    // 通过schoolID 和 当前年份 获取专业
    let majorList = await schoolDao.queryMajorBySchoolIdAndYear(
      schoolId,
      examYear - 1,
      lotId
    );

    return {
      majorList
    };
  },

  getSchoolDetail: async schoolId => {
    let schoolDetail = await schoolDao.selectSchoolDetail(schoolId);

    return schoolDetail;
  }
};
