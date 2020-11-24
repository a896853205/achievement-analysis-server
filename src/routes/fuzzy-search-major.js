import Result from '../../util/response';
import fuzzySearchMajorService from '../service/fuzzy-search-major-service';

const router = require('koa-router')();
router.prefix('/fuzzySearch');

// 模糊查询专业
router.post('/major', async (ctx) => {
  const { majorName } = ctx.request.body;

  if (majorName.length === 0) {
    ctx.body = new Result({
      data: [],
    });
  } else {
    let fuzzyMajorList = await fuzzySearchMajorService.getFuzzySearchMajor(
      majorName
    );
    ctx.body = new Result({
      data: fuzzyMajorList,
    });
  }
});

export default router;
