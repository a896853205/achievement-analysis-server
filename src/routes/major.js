import Result from '../../util/response';
import majorService from '../service/major-service';

const router = require('koa-router')();

router.prefix('/major');

router.post('/getMajorCategory', async ctx => {
  let majorCategory = await majorService.queryMajorCategory();

  ctx.body = new Result({
    data: majorCategory
  });
});

export default router;
