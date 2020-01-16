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

router.post('/getMajorProfile', async ctx => {
  const { majorTwoCode } = ctx.request.body;

  let majorDetail = await majorService.selectMajorDetailByid(majorTwoCode);

  ctx.body = new Result({
    data: majorDetail
  });
});

router.post('/getMajorDetail', async ctx => {
  const { majorTwoCode } = ctx.request.body;

  let majorDetail = await majorService.selectMajorDetail(majorTwoCode);

  ctx.body = new Result({
    data: majorDetail
  });
});

router.post('/getHotMajors', async ctx => {
  let hotMajors = await majorService.queryHotMajors();

  ctx.body = new Result({
    data: hotMajors
  });
});

router.post('/getSchoolMajor', async ctx => {
  const { schoolId, accountCategory } = ctx.request.body;

  let schoolMajor = await majorService.querySchoolMajor(schoolId, accountCategory);

  ctx.body = new Result({
    data: schoolMajor
  });
});
export default router;
