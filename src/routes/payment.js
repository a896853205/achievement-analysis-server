import paymentService from '../service/payment-service';
// 返回前台的对象
import Result from '../../util/response';

const router = require('koa-router')();

router.prefix('/payment');

router.post('/getAlipayPaymentUrl', async ctx => {
  try {
    let user = ctx.state.data;

    const url = await paymentService.getAlipayPaymentUrl(user);

    ctx.body = new Result({
      data: url
    });
  } catch (error) {
    ctx.body = new Result({
      status: 0,
      msg: '跳转支付宝页面错误,请稍后再试'
    });
  }
});

router.post('/signPayment', async ctx => {
  let postData = ctx.request.body;

  const res = await paymentService.signPayment(postData);

  console.log('res', res);
  ctx.send(res);
});

export default router;