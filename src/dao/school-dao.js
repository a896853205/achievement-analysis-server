// 数据库操作
import { db, SqlObject } from '../resources/db-connect';

// 数据库语句
import schoolMapper from '../resources/mapper/school-mapper';

export default {
	// 通过批次id查询学校
	querySchoolByLotId: async (lotId) => {
		let schoolList = await db.query(new SqlObject(schoolMapper.querySchoolByLotId, [ lotId ]));

		return schoolList;
	},

	// 通过学校id和当前年份获取学校
	queryMajorBySchoolIdAndYear: async (schoolId, year, lotId) => {
		let majorList = await db.query(new SqlObject(schoolMapper.getMajorBySchoolIdAndYear, [ schoolId, year, lotId ]));

		return majorList;
	}
};
