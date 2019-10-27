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

router.post('/getMajorDetail', async ctx => {
  const { major_level_two_code } = ctx.request.body;

  let majorDetail = await majorService.selectMajorDetailByid(
    major_level_two_code
  );

  ctx.body = new Result({
    data: majorDetail
  });
});

export default router;
