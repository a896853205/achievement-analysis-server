import newsDao from '../dao/news_dao';

export default {
  /**
   * 根据uuid查找新闻详细信息
   */
  selectNewsDetail: uuid => {
    return newsDao.selectNewsByuuid(uuid);
  }
};
