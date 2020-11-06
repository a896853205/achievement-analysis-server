import Result from '../../util/response';
import fuzzySearchMajorService from '../service/fuzzy-search-major-service';

const router = require('koa-router')();
router.prefix('/fuzzySearch');

// 模糊查询专业
router.get('/major', async (req, res) => {
  const { majorName } = req.query;
  if (majorName.length === 0) {
    req.body = new Result({
      data: [],
    });
  } else {
    let fuzzyMajorList = await fuzzySearchMajorService.getFuzzySearchMajor(
      majorName
    );
    req.body = new Result({
      data: fuzzyMajorList,
    });
  }
});

export default router;
