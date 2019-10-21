import newsDao from '../dao/news-dao';
import {
  SCHOOL_NEWS_LIST_NUM,
  MAJOR_NEWS_LIST_NUM,
  STUDENT_READ_NEWS_LIST_NUM,
  RANK_NEWS_LIST_NUM
} from '../constants/api-constants';
export default {
  getIndexData: async () => {
    let [
      schoolNewsList,
      majorNewsList,
      studentReadNewsList,
      rankNewsList
    ] = await Promise.all([
      newsDao.queryNewsProfileByType(1, SCHOOL_NEWS_LIST_NUM),
      newsDao.queryNewsProfileByType(2, MAJOR_NEWS_LIST_NUM),
      newsDao.queryNewsProfileByType(3, STUDENT_READ_NEWS_LIST_NUM),
      newsDao.queryNewsProfileByType(4, RANK_NEWS_LIST_NUM)
    ]);
    /**
     * 定义得到数量为常数，定义在constants文件夹，依次为 4  4 5 3
     */
    /**
  * 	
1是指院校资讯，2是指专业资讯，3是考生必读，4是排名集锦
按类型与指定数量返回，
剩余三个未处理
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
