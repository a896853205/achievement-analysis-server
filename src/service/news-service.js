import newsDao from '../dao/news-dao';
import { RECOMMEND_NEWS_NUM, PAGE_NEWS } from '../constants/api-constants';
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
     * 返回7个 RecommendNewsNum=7
     */
    return await newsDao.queryNewsProfileByType(type, RECOMMEND_NEWS_NUM);
  },

  queryHotNewsProfile: async () => {
    /**
     * 返回10个viewtimes次数最多
     */
    return await newsDao.queryHotNewsProfile();
  },

  /**
   * 返回新闻数组
   */
  queryMoreNews: async (page, type) => {
    return await newsDao.queryMoreNews(page, type);
  },

  /**
   * 返回新闻条数
   */
  queryMaxPageByType: async type => {
    /**
     * AllNewsNum
     */
    let allNewsNum = await newsDao.queryAllNewsNumByType(type);

    return await allNewsNum;
  }
};
