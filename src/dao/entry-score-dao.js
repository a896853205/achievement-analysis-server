// 数据库操作
import { db, SqlObject } from '../resources/db-connect';

// 数据库语句
import entryScoreMapper from '../resources/mapper/entry-score-mapper';

export default {
	// 通过uuid查询用户
	queryByUserUuid: async (userUuid) => {
		let result = await db.query(new SqlObject(entryScoreMapper.queryByUserUuid, [ userUuid ]));

		return result;
	}
};
