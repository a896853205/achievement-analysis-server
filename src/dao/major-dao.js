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
    return (
      await db.query(new SqlObject(majorMapper.selectMajorNameById, [id]))
    )[0];
  },
  selectMajorLevelOneByCode: async id => {
    return (
      await db.query(new SqlObject(majorMapper.selectMajorLevelOneByCode, [id]))
    )[0];
  },
  selectMajorCategoryByCode: async id => {
    return (
      await db.query(new SqlObject(majorMapper.selectMajorCategoryByCode, [id]))
    )[0];
  },
  selectMajorIntroById: async id => {
    return (
      await db.query(new SqlObject(majorMapper.selectMajorIntroById, [id]))
    )[0];
  },
  selectMajorSystemById: async id => {
    return (
      await db.query(new SqlObject(majorMapper.selectMajorSystemById, [id]))
    )[0];
  },
  queryHotMajors: async () => {
    return await db.query(new SqlObject(majorMapper.queryHotMajors));
  },
  selectMajorEnrollmentId: async id => {
    return (
      await db.query(new SqlObject(majorMapper.selectMajorEnrollmentId, [id]))
    )[0];
  },
  selectHotMajorDetail: async id => {
    return (
      await db.query(new SqlObject(majorMapper.selectHotMajorDetail, [id]))
    )[0];
  },
  querySchoolMajor: async (id, accountCategory) => {
    return await db.query(new SqlObject(majorMapper.querySchoolMajor, [id, accountCategory]));
  },
  selectMajorName: async id => {
    return (
      await db.query(new SqlObject(majorMapper.selectMajorName, [id]))
    )[0];
  },
  selectSchoolLots: async id => {
    return (
      await db.query(new SqlObject(majorMapper.selectSchoolLots, [id]))
    )[0];
  }
};
