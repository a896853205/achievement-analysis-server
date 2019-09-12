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
}