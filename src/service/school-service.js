// dao
import schoolDao from '../dao/school-dao';
import controlScoreRangeDao from '../dao/control-score-range-dao';

// 筛选算法
import {
  filtrateNatureSchool,
  filtratePropertySchool,
  filtrateTypeSchool,
  filtrateAreaFeatureSchool,
  splitSchoolByRange,
  culEnrollRateStrategies,
} from './school-filtrate';

import { proxyParseToOldScore, parseCurrentScore } from './rank-filtrate';

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
      scoreRange
    ] = await Promise.all([
      schoolDao.querySchoolByLotIdAndAccountCategory(lotId, accountCategory),
      schoolDao.queryScoreRankByCategoryAndYear(accountCategory, examYear),
      controlScoreRangeDao.queryScoreRangeByLotsId(lotId)
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

    // 将新的成绩转化为去年的成绩
    let [
      oldOneScoreAndRank,
    ] = proxyParseToOldScore(
      score,
      currentRank,
      oldRank,
      oldTwoRank,
      oldThreeRank
    );

    // 用去年的数据去筛选学校
    resultSchoolList = splitSchoolByRange(
      oldOneScoreAndRank.score,
      scoreRange,
      resultSchoolList,
      gatherValue,
      examYear - 1
    );

    // 把学校的位次也加上
    for (let i = 0; i < resultSchoolList.length; i++) {
      for (let j = 0; j < resultSchoolList[i].school_score.length; j++) {
        if (resultSchoolList[i].school_score[j].year === examYear) {
          resultSchoolList[i].school_score[j].rank = parseCurrentScore(
            resultSchoolList[i].school_score[j].score,
            currentRank
          ).fitCurrent.rank;
        } else if (resultSchoolList[i].school_score[j].year === examYear - 1) {
          resultSchoolList[i].school_score[j].rank = parseCurrentScore(
            resultSchoolList[i].school_score[j].score,
            oldRank
          ).fitCurrent.rank;
        } else if (resultSchoolList[i].school_score[j].year === examYear - 2) {
          resultSchoolList[i].school_score[j].rank = parseCurrentScore(
            resultSchoolList[i].school_score[j].score,
            oldTwoRank
          ).fitCurrent.rank;
        } else if (resultSchoolList[i].school_score[j].year === examYear - 3) {
          resultSchoolList[i].school_score[j].rank = parseCurrentScore(
            resultSchoolList[i].school_score[j].score,
            oldThreeRank
          ).fitCurrent.rank;
        }
      }
    }

    // 计算提档概率
    resultSchoolList = culEnrollRateStrategies[lotId](
      oldOneScoreAndRank,
      resultSchoolList,
      examYear
    );

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
      { currentRank, oldRank },
      scoreRange
    ] = await Promise.all([
      schoolDao.querySchoolByLotIdAndName(lotId, schoolName),
      schoolDao.queryScoreRankByCategoryAndYear(accountCategory, examYear),
      controlScoreRangeDao.queryScoreRangeByLotsId(lotId)
    ]);

    // 将新的成绩转化为去年的成绩
    score = proxyParseToOldScore(score, currentRank, oldRank);

    resultSchoolList = splitSchoolByRange(score, scoreRange, resultSchoolList);

    return {
      schoolList: resultSchoolList
    };
  },

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
      { currentRank, oldRank },
      scoreRange
    ] = await Promise.all([
      schoolDao.querySchoolByLotIdAndAccountCategory(lotId),
      schoolDao.querySchoolWithMajorByLotId(lotId),
      schoolDao.queryScoreRankByCategoryAndYear(accountCategory, examYear),
      controlScoreRangeDao.queryScoreRangeByLotsId(lotId)
    ]);

    // 将新的成绩转化为去年的成绩
    score = proxyParseToOldScore(score, currentRank, oldRank);

    resultSchoolList = splitSchoolByRange(score, scoreRange, resultSchoolList);

    // [ { lot_id: 1,
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
    // RowDataPacket {
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
    //   school_type_id: 13,
    //   school_type_name: '综合类',
    //   major_id: 1,
    //   major_name: '农学' },

    // originalSchoolList
    let correctSchoolIdArr = [];
    for (let item of originalSchoolList) {
      if (item.major_name && item.major_name.indexOf(majorName) !== -1) {
        correctSchoolIdArr.push(item.school_id);
      }
    }
    correctSchoolIdArr = new Set(correctSchoolIdArr);

    let schoolList = [];
    for (let item of resultSchoolList) {
      if (correctSchoolIdArr.has(item.school_id)) {
        schoolList.push(item);
      }
    }

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
