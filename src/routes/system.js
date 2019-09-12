// 返回前台的对象
import Result from '../../util/response';

// service
import systemService from '../service/system-service';

const router = require('koa-router')()

router.prefix('/system')

// 登录路由
router.get('/getAddressOption', async ctx => {
  
  let data = await systemService.getAddressOption();

  ctx.body = new Result({
    data
  });
});

export default router;