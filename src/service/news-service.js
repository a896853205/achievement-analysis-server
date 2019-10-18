import newsDao from '../dao/news-dao';

export default {
  /**
   * 根据uuid查找新闻详细信息
   */
  selectNewsDetail: async uuid => {
    // 查询新闻详细信息而且要将该新闻的查看数+1
    await newsDao.updatePlusOneNewsViewTimes(uuid);

    return await newsDao.selectNewsByuuid(uuid);
  },

  queryNewsProfileByType: async (type, count) => {
    /**
     * 返回包含指定数量的新闻的数组
     */
    return await newsDao.queryNewsProfileByType(type, count);
  },

  queryRecommendNewsByType: async type => {
    /**
     * 返回7个
     */
    return await newsDao.queryNewsProfileByType(type, 7);
  },

  queryHotNewsProfile: async () => {
    /**
     * 返回10个viewtimes次数最多
     */
    return await newsDao.queryHotNewsProfile();
  }
};
