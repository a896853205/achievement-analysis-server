import { db, SqlObject } from '../resources/db-connect';

// 数据库语句
import majorMapper from '../resources/mapper/major-mapper';

export default {
  queryMajorLevelTwo: async () => {
    return await db.query(new SqlObject(majorMapper.queryMajorLevelTwo));
  },

  queryMajorLevelOne: async () => {
    return await db.query(new SqlObject(majorMapper.queryMajorLevelOne));
  },

  queryMajorCategory: async () => {
    return await db.query(new SqlObject(majorMapper.queryMajorCategory));
  }
};
