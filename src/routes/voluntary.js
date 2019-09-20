// 返回前台的对象
import Result from '../../util/response';
import voluntaryService from '../service/voluntary-service';

const router = require('koa-router')();

router.prefix('/voluntary');

// 保存志愿信息
router.post('/saveVoluntary', async (ctx) => {
	let { lotId, voluntary } = ctx.request.body,
		user = ctx.state.data;

	let voluntaryUuid = await voluntaryService.saveVoluntary(lotId, voluntary, user);

	if (voluntaryUuid) {
    ctx.body = new Result({
      data: voluntaryUuid
    });
  } else {
    ctx.body = new Result({
      status: 0,
      msg: '没有生成报表的机会,请充值VIP'
    })
  }
	
});

export default router;
