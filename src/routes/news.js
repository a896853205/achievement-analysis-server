import Result from '../../util/response';
import { request } from 'http';
import newsService from '../service/news-service';
import { PageNews } from '../constants/api-constants';
const router = require('koa-router')();

router.prefix('/news');

router.post('/getNewsDetail', async ctx => {
  const { uuid } = ctx.request.body;

  let newsList = await newsService.selectNewsDetail(uuid);

  ctx.body = new Result({
    data: newsList
  });
});

router.post('/getRecommendNews', async ctx => {
  const { type } = ctx.request.body;
  /**
   * 根据type返回7个推荐新闻
   */
  let RecommendNews = await newsService.queryRecommendNewsByType(type);

  ctx.body = new Result({
    data: RecommendNews
  });
});

router.post('/getHotNews', async ctx => {
  let HotNewsList = await newsService.queryHotNewsProfile();

  ctx.body = new Result({
    data: HotNewsList
  });
});

router.post('/getMoreNews', async ctx => {
  const { page, type } = ctx.request.body;
  /**
   * MaxPage是常量，代表一页多少条
   * Maxpage为Pagemax
   */
  let MoreNewsList = await newsService.queryMoreNews(page, type);

  let MaxPage = await newsService.queryMaxPageByType(type);
  const MoreNews = {
    MoreNewsList,
    PageMax: MaxPage,
    PageLength: PageNews
  };

  ctx.body = new Result({
    data: MoreNews
  });
});
// router.post('/getNewsProfileList', async ctx => {
//   const { type, count } = ctx.request.body;
//   /*
//   根据返回的类型与数量查询指定数量的新闻
//   */

//   let ProfileList = await newsService.queryNewsProfileByType(type, count);

//   ctx.body = new Result({
//     data: ProfileList
//   });

// });

export default router;
