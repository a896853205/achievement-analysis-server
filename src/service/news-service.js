import newsDao from '../dao/news-dao';

export default {
  /**
   * 根据uuid查找新闻详细信息
   */
  selectNewsDetail: async uuid => {
    // 查询新闻详细信息而且要将该新闻的查看数+1
    await newsDao.updatePlusOneNewsViewTimes(uuid);

    return await newsDao.selectNewsByuuid(uuid);
  }
};
