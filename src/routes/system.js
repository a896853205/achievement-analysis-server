// 返回前台的对象
import Result from '../../util/response';

// service
import systemService from '../service/system-service';

const router = require('koa-router')();

router.prefix('/system');

// 获得系统首页警示信息
router.get('/getWarningData', async ctx => {
  let warningData = await systemService.getWarningData();

  ctx.body = new Result({
    data: warningData
  });
});

// 获得地址选项
router.get('/getAddressOption', async ctx => {
  let { addressType, code } = ctx.query,
    data = await systemService.getAddressOption({ addressType, code });

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
    gatherOptionList,
    provinceList
  ] = await Promise.all([
    systemService.getSchoolNatureOption(),
    systemService.getSchoolPropertyOption(),
    systemService.getSchoolTypeOption(),
    systemService.getAreaFeatureOption(),
    systemService.getVoluntaryOption(lotId),
    systemService.getGatherOption(),
    systemService.getProvince()
  ]);

  ctx.body = new Result({
    data: {
      schoolNature,
      schoolProperty,
      schoolType,
      areaFeature,
      voluntaryOptionList,
      gatherOptionList,
      provinceList
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
router.post('/getHighSchool', async ctx => {
  const { areaCode } = ctx.request.body;

  let highSchoolList = await systemService.queryHighSchoolById(areaCode);

  ctx.body = new Result({
    data: highSchoolList
  });
});

export default router;
