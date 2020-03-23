import AlipaySdk from 'alipay-sdk';
import AlipayFormData from 'alipay-sdk/lib/form';
import fs from 'fs';

export default {
  getAlipayPaymentUrl: async user => {
    const alipaySdk = new AlipaySdk({
      // 参考下方 SDK 配置
      appId: '2019121069819226',
      privateKey: fs.readFileSync('./ssl/alipay-private-key.pem', 'ascii')
    });

    const formData = new AlipayFormData();
    // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
    formData.setMethod('get');

    formData.addField(
      'notifyUrl',
      'https://www.zhiyingguihua.com/payment/signPayment'
    );
    formData.addField('bizContent', {
      outTradeNo: 'out_trade_no',
      productCode: 'FAST_INSTANT_TRADE_PAY',
      totalAmount: '0.01',
      subject: 'VIP志愿卡（黑龙江专用）',
      body: `使用功能：学业测评、查数据、智能填报、志愿合理分析、就业前景分析等。
      适用对象：普通类文理科考生（自主招生、专科及艺术体育类考生暂不适用）。
      使用时效：有效期截止到用户自行选择高考年的9月1日为止。`,
      userUuid: user.uuid
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
    const alipaySdk = new AlipaySdk({
      // 参考下方 SDK 配置
      appId: '2019121069819226',
      privateKey: fs.readFileSync('./ssl/alipay-private-key.pem', 'ascii')
    });

    console.log('postData', postData);

    let isSuccess = alipaySdk.checkNotifySign(postData);

    console.log('isSuccess', isSuccess);
    if (isSuccess) {
      // 把信息存到数据库
      return 'true';
    } else {
      return 'false';
    }
  }
};
