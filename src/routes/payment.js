import paymentService from '../service/payment-service';
// 返回前台的对象
import Result from '../../util/response';
import userDao from "../dao/user-dao";

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
  try {
    let postData = ctx.request.body;

    const res = await paymentService.signPayment(postData);

    ctx.body = res;
  } catch (error) {
    console.error(error);
    ctx.body = 'false';
  }
});

router.post('/getWechatPaymentQRUrl', async ctx => {
  try {
    let user = ctx.state.data;

    if (user.roleCode === 2) {
      ctx.body = new Result({
        status: 0,
        msg: '您已经是vip啦,无需再次购买'
      });
    } else {
      const url = await paymentService.getWechatPaymentQRUrl(user);

      ctx.body = new Result({
        data: url
      });
    }
  } catch (error) {
    console.log(error);
    ctx.body = new Result({
      status: 0,
      msg: '获取微信二维码错误,请稍后再试'
    });
  }
});

router.post('/signWeChatPayment', async ctx => {
  try {
    let postData = ctx.request.body;
    console.log('payment:', ctx.request);
    console.log('payment:', postData);

    const res = await paymentService.signWeChatPayment(postData);

    ctx.body = res;
  } catch (error) {
    console.error(error);
    ctx.body = 'FAIL';
  }
});

router.post('/test', async ctx => {
    const user = ctx.state.data;
    console.log(user.uuid);
    const user2 = await userDao.selectByUuid(user.uuid);
    console.log(user2);
    ctx.body = {
        data:'test'
    };
});

export default router;
