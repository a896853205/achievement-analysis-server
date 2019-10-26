import Result from '../../util/response';
import majorService from '../service/major-service';

const router = require('koa-router')();

router.prefix('/major');

router.post('/getMajor', async ctx => {
  let a = await majorService.queryMajor();

  ctx.body = new Result({
    data: a
  });
});

export default router;
