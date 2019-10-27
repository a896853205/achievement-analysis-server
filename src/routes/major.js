import Result from '../../util/response';
import majorService from '../service/major-service';

const router = require('koa-router')();

router.prefix('/major');

router.post('/getMajor', async ctx => {
  let Major = await majorService.queryMajor();

  ctx.body = new Result({
    data: Major
  });
});

router.post('/getMajorDetail', async ctx => {
  const { major_level_two_code } = ctx.request.body;
  console.log(major_level_two_code);
  let majorDetail = await majorService.selectMajorDetailByid(
    major_level_two_code
  );

  ctx.body = new Result({
    data: majorDetail
  });
});

export default router;
