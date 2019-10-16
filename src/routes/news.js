import Result from '../../util/response';
import { request } from 'http';
import newsService from '../service/news-service';
const router = require('koa-router')();

router.prefix('/news');

router.post('/getNewsDetail', async ctx => {
  const { uuid } = ctx.request.body;

  newsList = await newsService.selectNewsDetail(uuid);

  ctx.data.body = new Result({
    data: newsList
  });
});

export default router;
