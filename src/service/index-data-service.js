import newsDao from '../dao/news-dao';
import {
  schoolNewsListNum,
  majorNewsListNum,
  studentReadNewsListNum,
  rankNewsListNum
} from '../constants/api-constants';
export default {
  getIndexData: async () => {
    let [
      schoolNewsList,
      majorNewsList,
      studentReadNewsList,
      rankNewsList
    ] = await Promise.all([
      newsDao.queryNewsProfileByType(1, schoolNewsListNum),
      newsDao.queryNewsProfileByType(2, majorNewsListNum),
      newsDao.queryNewsProfileByType(3, studentReadNewsListNum),
      newsDao.queryNewsProfileByType(4, rankNewsListNum)
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
