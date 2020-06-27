// 返回前台的对象
import Result from '../../util/response';
import voluntaryService from '../service/voluntary-service';

const router = require('koa-router')();

router.prefix('/voluntary');

router.post('/updateReportAlterTimeDrop1', async ctx=> {
    let user = ctx.state.data;
    const result = await voluntaryService.updateReportAlterTimeDrop1(
        user.reportAlterTime - 1,
        user.uuid
    );
    ctx.body = new Result({
        data: {
            info:'success'
        }
    });
});

router.post('/updateDeepAlterTimeDrop1', async ctx=> {
    let user = ctx.state.data;
    const result = await voluntaryService.updateDeepAlterTimeDrop1(
        user.deepAlterTime - 1,
        user.uuid
    );
    ctx.body = new Result({
        data: {
            info:'success'
        }
    });
});

// 保存志愿信息
router.post('/saveVoluntary', async ctx => {
  let { lotId, voluntary, reportType } = ctx.request.body,
    user = ctx.state.data;

  let voluntaryUuid = await voluntaryService.saveVoluntary(
    lotId,
    voluntary,
    user,
    reportType
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

// 获取报表报告
router.post('/getVoluntaryResult', async ctx => {
  let { voluntaryUuid } = ctx.request.body;

  let voluntaryResult = await voluntaryService.culVoluntaryResult(
    voluntaryUuid
  );

  ctx.body = new Result({
    data: voluntaryResult
  });
});

// 获取志愿表通过志愿表的uuid
router.post('/getVoluntaryListOption', async ctx => {
  let { voluntaryUuid } = ctx.request.body;

  let voluntaryList = await voluntaryService.queryVoluntaryListByVoluntaryUuid(
    voluntaryUuid
  );

  ctx.body = new Result({
    data: voluntaryList
  });
});

// 根据志愿的uuid，获取志愿表上的每一项学校和专业
router.get('/getVoluntarySchoolAndMajor', async ctx => {
  let { voluntaryUuid } = ctx.query,
  voluntaryData = await voluntaryService.queryVoluntarySchoolAndMajorByVoluntaryUuid(
    voluntaryUuid
  );

  ctx.body = new Result({
    data: voluntaryData
  });
});

router.get('/getLotIdByVoluntaryUuid', async ctx => {
    const { voluntaryUuid } = ctx.query;

    const data = await voluntaryService.getLotIdByVoluntaryUuid( voluntaryUuid );

    ctx.body = new Result({
        data: data[0].fk_lots_id
    });
});

// 获取深度分析报告
router.post('/getVoluntaryDeepResult', async ctx => {
  let { voluntaryUuid, voluntarieerId, majorIndex } = ctx.request.body;

  let voluntaryDeepResult = await voluntaryService.culVoluntaryDeepResult(
    voluntaryUuid,
    voluntarieerId,
    majorIndex
  );

  ctx.body = new Result({
    data: voluntaryDeepResult
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

/**
 * 暂存我的志愿表
 */
router.post('/saveTempVoluntary', async ctx => {
  let user = ctx.state.data,
    { voluntary } = ctx.request.body;

  await voluntaryService.saveTempVoluntary(voluntary, user.uuid);

  ctx.body = new Result({
    msg: '暂存成功'
  });
});

/**
 * 查询我的暂存志愿表
 */
router.post('/getTempVoluntary', async ctx => {
  let user = ctx.state.data;

  let voluntary = await voluntaryService.selectTempVoluntary(user.uuid);

  ctx.body = new Result({
    data: voluntary
  });
});

export default router;
