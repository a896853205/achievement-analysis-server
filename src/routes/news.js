import Result from '../../util/response';
import { request } from 'http';
import newsService from '../service/news';
const router = require('koa-router')();

router.post('/getNewsDetail', async data => {
  const { uuid } = request.body;

  newsList = await newsService.select(uuid);

  data.body = new Result({
    data: newsList
  });
});

export default router;
