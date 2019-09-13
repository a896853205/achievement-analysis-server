// 数据库操作
import { db, SqlObject } from '../resources/db-connect';

// 数据库语句
import systemMapper from '../resources/mapper/system-mapper';

export default {
  // 通过uuid查询用户
  queryProvince: async () => {
    let province = await db.query(new SqlObject(systemMapper.queryProvince));

    return province;
  },

  // 获取学校办学性质
  querySchoolNature: async () => {
    let schoolNature = await db.query(new SqlObject(systemMapper.querySchoolNature));

    return schoolNature;
  },

  // 获取学校办学性质
  querySchoolProperty: async () => {
    let schoolProperty = await db.query(new SqlObject(systemMapper.querySchoolProperty));

    return schoolProperty;
  },

  // 获取学校办学性质
  querySchoolType: async () => {
    let schoolType = await db.query(new SqlObject(systemMapper.querySchoolType));

    return schoolType;
  },

  // 获取学校办学性质
  queryAreaFeature: async () => {
    let areaFeature = await db.query(new SqlObject(systemMapper.queryAreaFeature));

    return areaFeature;
  }
}