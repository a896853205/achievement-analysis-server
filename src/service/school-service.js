// dao
import schoolDao from '../dao/school-dao';
import controlScoreRangeDao from '../dao/control-score-range-dao';

// 筛选算法
import {
  filtrateNatureSchool,
  filtratePropertySchool,
  filtrateTypeSchool,
  filtrateAreaFeatureSchool,
  splitSchoolByRange
} from './school-filtrate';

import { proxyParseToOldScore } from './rank-filtrate';

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
      { currentRank, oldRank },
      scoreRange
    ] = await Promise.all([
      schoolDao.querySchoolByLotId(lotId),
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
    score = proxyParseToOldScore(score, currentRank, oldRank);

    resultSchoolList = splitSchoolByRange(
      score,
      scoreRange,
      resultSchoolList,
      gatherValue
    );

    return {
      schoolList: resultSchoolList
    };
  },

  // 获取所有学校通过学校名
  getSchoolListBySchoolName: async ({ lotId, schoolName, score, accountCategory, examYear }) => {
		let [resultSchoolList,
			{ currentRank, oldRank }, scoreRange] = await Promise.all([
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
