import newsDao from '../dao/news-dao';

export default {
  getIndexData: async () => {
    let [
      schoolNewsList,
      majorNewsList,
      studentReadNewsList,
      rankNewsList
    ] = await Promise.all([
      newsDao.queryNewsProfileByType(1, 4),
      newsDao.queryNewsProfileByType(2, 4),
      newsDao.queryNewsProfileByType(3, 5),
      newsDao.queryNewsProfileByType(4, 3)
    ]);
    /**
     * 1是指院校资讯，2是指专业资讯，3是考生必读，4是排名集锦
     * 按类型与指定数量返回，
     * 剩余三个未处理
     */
    return {
      schoolNewsList,
      majorNewsList,
      studentReadNewsList,
      rankNewsList,
      courseList: [],
      questionNewsList: [],
      schoolRecommendList: []
    };
  }
};
