import alipaySdk from '../../util/alipay-sdk';
import AlipayFormData from 'alipay-sdk/lib/form';
import uuid from 'uuid';
import systemDao from '../dao/system-dao';
import userDao from '../dao/user-dao';

export default {
  getAlipayPaymentUrl: async user => {
    const formData = new AlipayFormData();
    // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
    formData.setMethod('get');

    formData.addField(
      'notifyUrl',
      'https://www.zhiyingguihua.com:7500/payment/signPayment'
    );

    formData.addField('bizContent', {
      outTradeNo: uuid.v1(),
      productCode: 'FAST_INSTANT_TRADE_PAY',
      totalAmount: '0.01',
      subject: 'VIP志愿卡（黑龙江专用）',
      body: `使用功能：学业测评、查数据、智能填报、志愿合理分析、就业前景分析等。
      适用对象：普通类文理科考生（自主招生、专科及艺术体育类考生暂不适用）。
      使用时效：有效期截止到用户自行选择高考年的9月1日为止。`,
      passbackParams: JSON.stringify({ userUuid: user.uuid })
    });

    const result = await alipaySdk.exec(
      'alipay.trade.page.pay',
      {},
      { formData: formData }
    );

    // result 为可以跳转到支付链接的 url
    return result;
  },

  signPayment: async postData => {
    console.log('postData', postData);

    const isSuccess = alipaySdk.checkNotifySign(postData);

    const data = JSON.parse(postData);

    console.log('isSuccess', isSuccess);

    // 将充值信息存数据库中
    await paymentDao.insertPayment({
      gmtCreate: data.gmt_create,
      gmtPayment: data.gmt_payment,
      subject: data.subject,
      buyerId: data.buyer_id,
      receiptAmount: data.receipt_amount,
      buyerPayAmount: data.buyer_pay_amount,
      userUuid: JSON.parse(data.passback_params).userUuid,
      outTradeNo: data.out_trade_no,
      totalAmount: data.total_amount,
      tradeNo: data.trade_no,
      isSuccess
    });

    if (isSuccess) {
      try {
        // 将用户的等级设置成vip,然后按vip的当前三种次数赋值到user表中
        const role = await systemDao.selectRoleByCode(2);
        await userDao.updateUserTimes({
          userUuid: JSON.parse(data.passback_params).userUuid,
          roleCode: 2,
          scoreAlterTime: role.scoreAlterTime,
          reportAlterTime: role.reportAlterTime,
          deepAlterTime: role.deepAlterTime
        });
      } catch (error) {
        console.error(error);
        return 'false';
      }
      return 'true';
    } else {
      return 'false';
    }
  }
};
