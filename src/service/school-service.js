// dao
import schoolDao from '../dao/school-dao';
import controlScoreRangeDao from '../dao/control-score-range-dao';

// 筛选算法
import {
	filtrateNatureSchool,
	filtratePropertySchool,
	filtrateTypeSchool,
	filtrateAreaFeatureSchool,
	parseToOldScore,
	initSchool,
	splitSchoolByRange
} from './school-filtrate';

export default {
	// 获取所有学校通过批次id
	getSchoolList: async ({
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
		let [ schoolList, { currentRank, oldRank }, scoreRange ] = await Promise.all([
			schoolDao.querySchoolByLotId(lotId, accountCategory),
			schoolDao.queryScoreRankByCategoryAndYear(accountCategory, examYear),
			controlScoreRangeDao.queryScoreRangeByLotsId(lotId)
		]);

		// 初始化数据
		let resultSchoolList = initSchool(schoolList);

		// 对办学性质进行筛选
		resultSchoolList = filtrateNatureSchool(natureValues, resultSchoolList);

		// 对学校属性进行筛选
		resultSchoolList = filtratePropertySchool(propertyValues, resultSchoolList);

		// 对高校类别进行筛选
		resultSchoolList = filtrateTypeSchool(typeValues, resultSchoolList);

		// 对地域特色进行筛选
		resultSchoolList = filtrateAreaFeatureSchool(areaFeatureValues, resultSchoolList);

		// 将新的成绩转化为去年的成绩
		score = parseToOldScore(score, currentRank, oldRank);

		resultSchoolList = splitSchoolByRange(score, scoreRange, resultSchoolList, gatherValue);

		return {
			schoolList: resultSchoolList
		}
	},

	// 模拟获取专业
	getMajorList: async (schoolId, examYear, lotId) => {
		// 通过schoolID 和 当前年份 获取专业
		let majorList = await schoolDao.queryMajorBySchoolIdAndYear(schoolId, examYear - 1, lotId);

		return {
			majorList
		};
	}
};
