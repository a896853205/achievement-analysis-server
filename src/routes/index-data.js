import Result from '../../util/response';
import { request } from 'http';
import IndexDataService from '../service/index-data-service';

const router = require('koa-router')();

router.prefix('/index');

/**
 * 得到首页数据
 */
router.post('/getIndexData', async ctx => {
  let IndexList = await IndexDataService.getIndexData();

  ctx.body = new Result({
    data: IndexList
  });
});

export default router;
