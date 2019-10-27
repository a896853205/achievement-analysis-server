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
  },
  selectMajorNameById: async id => {
    return (await db.query(
      new SqlObject(majorMapper.selectMajorNameById, [id])
    ))[0];
  },
  selectMajorLevelOneByCode: async id => {
    return (await db.query(
      new SqlObject(majorMapper.selectMajorLevelOneByCode, [id])
    ))[0];
  },
  selectMajorCategoryByCode: async id => {
    return (await db.query(
      new SqlObject(majorMapper.selectMajorCategoryByCode, [id])
    ))[0];
  },
  selectMajorIntroById: async id => {
    return (await db.query(
      new SqlObject(majorMapper.selectMajorIntroById, [id])
    ))[0];
  },
  selectMajorSystemById: async id => {
    return (await db.query(
      new SqlObject(majorMapper.selectMajorSystemById, [id])
    ))[0];
  }
};
