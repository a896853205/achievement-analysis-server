import voluntaryDao from '../dao/voluntary-dao';

export default {
  // 保存志愿信息
  saveVoluntary: async (lotId, voluntary, user) => {
    let voluntaryUuid = undefined;

    if (user.simulated_count > 0) {
      voluntaryUuid = await voluntaryDao.saveVoluntary(lotId, voluntary, user);
    }

    // 一切正确,token生成
    return voluntaryUuid;
  }

}