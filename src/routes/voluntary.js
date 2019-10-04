// 返回前台的对象
import Result from '../../util/response';
import voluntaryService from '../service/voluntary-service';

const router = require('koa-router')();

router.prefix('/voluntary');

// 保存志愿信息
router.post('/saveVoluntary', async ctx => {
  let { lotId, voluntary } = ctx.request.body,
    user = ctx.state.data;

  let voluntaryUuid = await voluntaryService.saveVoluntary(
    lotId,
    voluntary,
    user
  );

  if (voluntaryUuid === 0) {
    ctx.body = new Result({
      status: 0,
      msg: '没有生成报表的机会,请充值VIP'
    });
  } else if (voluntaryUuid === -1) {
    ctx.body = new Result({
      status: 0,
      msg: '请至少选择一个志愿'
    });
  } else {
    ctx.body = new Result({
      data: voluntaryUuid
    });
  }
});

router.post('/getVoluntaryResult', async ctx => {
  let { voluntaryUuid } = ctx.request.body;

  let voluntaryResult = await voluntaryService.culVoluntaryResult(
    voluntaryUuid
  );

  ctx.body = new Result({
    data: voluntaryResult
  });
});

/**
 * 获取我的所有志愿
 */
router.post('/getMyVoluntary', async ctx => {
  let user = ctx.state.data,
    voluntaryList = await voluntaryService.queryVoluntaryList(user.uuid);

  ctx.body = new Result({
    data: voluntaryList
  });
});

export default router;
