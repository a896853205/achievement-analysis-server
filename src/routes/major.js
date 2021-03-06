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
  const { schoolId, accountCategory, year } = ctx.request.body;

  let schoolMajor = await majorService.querySchoolMajor(schoolId, accountCategory, year);

  ctx.body = new Result({
    data: schoolMajor
  });
});
// 获取专业录取年份
router.get('/getAllYear', async ctx => {

  let years = await majorService.getAllYear();

  ctx.body = new Result({
    data: years
  });
});

// 获取专业列表
router.post('/getMajorList', async ctx => {
  const { researchMajorName } = ctx.request.body;
  let majorList = await majorService.getMajorList(researchMajorName);

  ctx.body = new Result({
    data: majorList
  });
});
export default router;
