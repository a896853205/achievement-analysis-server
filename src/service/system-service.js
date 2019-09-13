// dao
import systemDao from '../dao/system-dao';

export default {
  // 获取系统地址
  getAddressOption: async () => {
    let provinceList = await systemDao.queryProvince();

    return {
      provinceList
    }
  },

  // 获取学校办学性质
  getSchoolNatureOption: async () => {
    let schoolNatureList = await systemDao.querySchoolNature();

    return schoolNatureList;
    
  },

  // 获取学校属性
  getSchoolPropertyOption: async () => {
    let schoolPropertyList = await systemDao.querySchoolProperty();

    return schoolPropertyList;
  },

  // 获取搞笑类别
  getSchoolTypeOption: async () => {
    let schoolTypeList = await systemDao.querySchoolType();

    return schoolTypeList;
  },

  // 获取地域特色
  getAreaFeatureOption: async () => {
    let areaFeatureList = await systemDao.queryAreaFeature();

    return areaFeatureList;
  }
}