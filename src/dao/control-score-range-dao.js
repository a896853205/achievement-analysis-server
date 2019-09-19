// 数据库操作
import { db, SqlObject } from '../resources/db-connect';

// 数据库语句
import controlScoreRangeMapper from '../resources/mapper/control-score-range-mapper';

export default {
	// 通过uuid查询用户
	queryScoreRangeByLotsId: async (lotsId) => {
		let result = await db.query(new SqlObject(controlScoreRangeMapper.queryScoreRangeByLotsId, [ lotsId ]));

		return result[0];
	}
};
