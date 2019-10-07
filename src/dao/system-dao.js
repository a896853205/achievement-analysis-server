// 数据库操作
import { db, SqlObject } from '../resources/db-connect';

// 数据库语句
import systemMapper from '../resources/mapper/system-mapper';

export default {
  // 查询所有省
  queryProvince: async () => {
    let province = await db.query(new SqlObject(systemMapper.queryProvince));

    return province;
  },

  // 通过省号查询市区
  queryCity: async ({ provinceCode }) => {
    return await db.query(
      new SqlObject(systemMapper.queryCity, [provinceCode])
    );
  },

  // 通过省号查询市区
  queryArea: async ({ cityCode }) => {
    return await db.query(new SqlObject(systemMapper.queryArea, [cityCode]));
  },

  // 获取学校办学性质
  querySchoolNature: async () => {
    let schoolNature = await db.query(
      new SqlObject(systemMapper.querySchoolNature)
    );

    return schoolNature;
  },

  // 获取学校办学属性
  querySchoolProperty: async () => {
    let schoolProperty = await db.query(
      new SqlObject(systemMapper.querySchoolProperty)
    );

    return schoolProperty;
  },

  // 获取学校办学类型
  querySchoolType: async () => {
    let schoolType = await db.query(
      new SqlObject(systemMapper.querySchoolType)
    );

    return schoolType;
  },

  // 获取学校地区特色
  queryAreaFeature: async () => {
    let areaFeature = await db.query(
      new SqlObject(systemMapper.queryAreaFeature)
    );

    return areaFeature;
  },

  // 获取批次信息
  queryLots: async () => {
    let lots = await db.query(new SqlObject(systemMapper.queryLots));

    return lots;
  },

  // 获取志愿个数
  queryVoluntaryOption: async lotsId => {
    let voluntaryOption = await db.query(
      new SqlObject(systemMapper.queryVoluntaryOption, [lotsId])
    );

    return voluntaryOption;
  },

  // 获取集合选项
  queryGatherOption: async () => {
    let gatherOption = await db.query(
      new SqlObject(systemMapper.queryGatherOption)
    );

    return gatherOption;
  }
};
