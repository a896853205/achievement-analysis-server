// 数据库操作
import { db, SqlObject } from '../resources/db-connect';

// 数据库语句
import systemMapper from '../resources/mapper/system-mapper';

export default {
  // 查询首页警示信息
  queryWarningData: async () => {
    let warningData = await db.query(new SqlObject(systemMapper.queryWarningData));
    return warningData;
  },

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

  // 通过id获得批次信息
  selectLotById: async id => {
    return (await db.query(new SqlObject(systemMapper.selectLotById, [id])))[0];
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
  },
  // 根据lotId获得志愿的个数
    queryVolunteerCountByLotId: async (lotId) => {
    return (await db.query(
      new SqlObject(systemMapper.queryVolunteerCountByLotId, [lotId])
    ))[0].volunteer_count;
  },

  // 查询权限
  selectRoleByCode: async roleCode => {
    return (await db.query(
      new SqlObject(systemMapper.selectRoleByCode, [roleCode])
    ))[0];
  },

  // 根据deepId 查询单位满意度
  selectUnitSatisfaction: async deepId => {
    return (await db.query(
      new SqlObject(systemMapper.selectUnitSatisfaction, [deepId])
    ))[0];
  },
  queryHighSchoolById: async areaCode => {
    return await db.query(
      new SqlObject(systemMapper.queryHighSchoolById, [areaCode])
    );
  }
};
