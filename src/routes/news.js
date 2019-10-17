import Result from '../../util/response';
import { request } from 'http';
import newsService from '../service/news-service';
const router = require('koa-router')();

router.prefix('/news');

router.post('/getNewsDetail', async ctx => {
  const { uuid } = ctx.request.body;

  let newsList = await newsService.selectNewsDetail(uuid);

  ctx.body = new Result({
    data: newsList
  });
});

router.post('/getNewsProfileList', async ctx => {
  const { type, count } = ctx.request.body;

  let ProfileList = await newsService.queryNewsProfileByType(type, count);

  ctx.body = new Result({
    data: ProfileList
  });
});

export default router;
