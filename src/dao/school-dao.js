// 数据库操作
import { db, SqlObject } from '../resources/db-connect';

// 数据库语句
import schoolMapper from '../resources/mapper/school-mapper';

// 处理数据函数
import { initSchool } from './school-filtrate';

export default {
	// 通过批次id查询学校
	querySchoolByLotIdAndAccountCategory: async (lotId, accountCategory) => {
		let schoolList = await db.query(new SqlObject(schoolMapper.querySchoolByLotIdAndAccountCategory, [ lotId, accountCategory ]));

		return initSchool(schoolList);
	},

	// 通过批次id和学校名查询学校
	querySchoolByLotIdAndName: async (lotId, schoolName) => {
		let schoolList = await db.query(new SqlObject(schoolMapper.querySchoolByLotIdAndName, [ lotId, `%${schoolName}%` ]));

		return initSchool(schoolList);
	},

	querySchoolWithMajorByLotId: async (lotId) => {
		let originalSchoolList = await db.query(new SqlObject(schoolMapper.querySchoolWithMajorByLotId, [ lotId ]));

		return originalSchoolList;
	},

	// 查询所有学校
	querySchool: async () => {
		let schoolList = await db.query(new SqlObject(schoolMapper.querySchool, []))

		return initSchool(schoolList);
	},

	// 通过学校id和当前年份获取学校
	queryMajorBySchoolIdAndYear: async (schoolId, year, lotId) => {
		let majorList = await db.query(
			new SqlObject(schoolMapper.getMajorBySchoolIdAndYear, [ schoolId, lotId, year ])
		);

		return majorList;
	},

	// 通过考试年份和文科理科来获取分数段
	queryScoreRankByCategoryAndYear: async (accountCategory, year) => {
		let scoreRankList = await db.query(
				new SqlObject(schoolMapper.queryScoreRankByCategoryAndYear, [ accountCategory, year, year - 1, year - 2, year - 3 ])
			),
			currentRank = [],
			oldOneRank = [],
			oldTwoRank = [],
			oldThreeRank = [];


		// 对scoreRankList进行处理,处理成四个年份的数组
		for (let scoreRankItem of scoreRankList) {
			if (scoreRankItem.year === year) {
				currentRank.push(scoreRankItem);
			} else if (scoreRankItem.year === year - 1) {
				oldOneRank.push(scoreRankItem);
			} else if (scoreRankItem.year === year - 2) {
				oldTwoRank.push(scoreRankItem);
			} else if (scoreRankItem.year === year - 3) {
				oldThreeRank.push(scoreRankItem);
			}
		}

		return {
			currentRank,
			oldRank: oldOneRank,
			oldTwoRank,
			oldThreeRank
		};
	},

	selectSchoolDetail: async (schoolId) => {
		let schoolDetailList = await db.query(
			new SqlObject(schoolMapper.querySchoolDetail, [schoolId])
		);

		return initSchool(schoolDetailList)[0];
	},

	queryLotsScore: async (examYear, accountCategory) => {
		// 查询去年的lots
		let lotsScoreList = await db.query(new SqlObject(schoolMapper.queryLotsScore, [examYear, examYear - 1, examYear - 2, examYear - 3, accountCategory])),
			currentLotsScore = [],
			oldOneLotsScore = [],
			oldTwoLotsScore = [],
			oldThreeLotsScore = [];

			// 对lotsScoreList进行处理,处理成四个年份的数组
		for (let lotsScoreItem of lotsScoreList) {
			if (lotsScoreItem.year === examYear) {
				currentLotsScore.push(lotsScoreItem);
			} else if (lotsScoreItem.year === examYear - 1) {
				oldOneLotsScore.push(lotsScoreItem);
			} else if (lotsScoreItem.year === examYear - 2) {
				oldTwoLotsScore.push(lotsScoreItem);
			} else if (lotsScoreItem.year === examYear - 3) {
				oldThreeLotsScore.push(lotsScoreItem);
			}
		}
		
		return {
			currentLotsScore,
			oldOneLotsScore,
			oldTwoLotsScore,
			oldThreeLotsScore
		};
	}
};
