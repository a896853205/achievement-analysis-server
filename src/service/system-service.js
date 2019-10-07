// dao
import systemDao from '../dao/system-dao';

export default {
  // 获取系统地址
  getAddressOption: async ({ addressType, code }) => {
    let provinceList = [],
      cityList = [],
      areaList = [];

    if (addressType === 'province') {
      provinceList = await systemDao.queryProvince();
    } else if (addressType === 'city') {
      cityList = await systemDao.queryCity({ provinceCode: code });
    } else if (addressType === 'area') {
      areaList = await systemDao.queryArea({ cityCode: code });
    }

    return {
      provinceList,
      cityList,
      areaList
    };
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
  },

  getLotsOption: async () => {
    let lotsList = await systemDao.queryLots();

    return lotsList;
  },

  getVoluntaryOption: async lotId => {
    let voluntaryOptionList = await systemDao.queryVoluntaryOption(lotId);

    return voluntaryOptionList;
  },

  // 获取集合选项
  getGatherOption: async () => {
    let gatherOptionList = await systemDao.queryGatherOption();

    return gatherOptionList;
  }
};
