// 返回前台的对象
import Result from '../../util/response';

// service
import systemService from '../service/system-service';

const router = require('koa-router')();

router.prefix('/system');

// 获得地址选项
router.get('/getAddressOption', async ctx => {
  let data = await systemService.getAddressOption();

  ctx.body = new Result({
    data
  });
});

// 获得学校
router.post('/getSchoolOption', async ctx => {
  let { lotId } = ctx.request.body;

  let [
    schoolNature,
    schoolProperty,
    schoolType,
    areaFeature,
    voluntaryOptionList,
    gatherOptionList
  ] = await Promise.all([
    systemService.getSchoolNatureOption(),
    systemService.getSchoolPropertyOption(),
    systemService.getSchoolTypeOption(),
    systemService.getAreaFeatureOption(),
    systemService.getVoluntaryOption(lotId),
    systemService.getGatherOption()
  ]);

  ctx.body = new Result({
    data: {
      schoolNature,
      schoolProperty,
      schoolType,
      areaFeature,
			voluntaryOptionList,
			gatherOptionList
    }
  });
});

router.get('/getLotsOption', async ctx => {
  let lotsOption = await systemService.getLotsOption();

  ctx.body = new Result({
    data: {
      lotsOption
    }
  });
});

export default router;
