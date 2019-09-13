// 返回前台的对象
import Result from '../../util/response';

// service
import systemService from '../service/system-service';

const router = require('koa-router')()

router.prefix('/system')

// 获得地址选项
router.get('/getAddressOption', async ctx => {
  let data = await systemService.getAddressOption();

  ctx.body = new Result({
    data
  });
});

// 获得学校
router.get('/getSchoolOption', async ctx => {
  let schoolNature = await systemService.getSchoolNatureOption();
  let schoolProperty = await systemService.getSchoolPropertyOption();
  let schoolType = await systemService.getSchoolTypeOption();
  let areaFeature = await systemService.getAreaFeatureOption();

  ctx.body = new Result({
    data: {
      schoolNature,
      schoolProperty,
      schoolType,
      areaFeature
    }
  });
})

export default router;