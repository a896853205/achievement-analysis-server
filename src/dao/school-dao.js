// 数据库操作
import { db, SqlObject } from '../resources/db-connect';

// 数据库语句
import schoolMapper from '../resources/mapper/school-mapper';

// 处理数据函数
import { initSchool } from './school-filtrate';

export default {
	// 通过批次id查询学校
	querySchoolByLotId: async (lotId) => {
		let schoolList = await db.query(new SqlObject(schoolMapper.querySchoolByLotId, [ lotId ]));

		return initSchool(schoolList);
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
				new SqlObject(schoolMapper.queryScoreRankByCategoryAndYear, [ accountCategory, year, year - 1 ])
			),
			currentRank = [],
			oldRank = [];

		// 对scoreRankList进行处理,处理成两个年份的数组
		for (let scoreRankItem of scoreRankList) {
			if (scoreRankItem.year === year) {
				currentRank.push(scoreRankItem);
			} else {
				oldRank.push(scoreRankItem);
			}
		}

		return {
			currentRank,
			oldRank
		};
	},

	selectSchoolDetail: async (schoolId) => {
		let schoolDetailList = await db.query(
			new SqlObject(schoolMapper.querySchoolDetail, [schoolId])
		);

		return initSchool(schoolDetailList)[0];
	},

	queryLotsScore: async (examYear) => {
		// 查询去年的lots
		let lotsScoreList = await db.query(new SqlObject(schoolMapper.queryLotsScore, [examYear - 1]))
		
		return lotsScoreList;
	}
};
