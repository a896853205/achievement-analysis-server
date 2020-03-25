import alipaySdk from '../../util/alipay-sdk';
import AlipayFormData from 'alipay-sdk/lib/form';
import uuid from 'uuid';
import systemDao from '../dao/system-dao';
import userDao from '../dao/user-dao';
import paymentDao from '../dao/payment-dao';
import md5 from 'md5';
import xml2js from 'xml2js';
import { WECHAT_KEY } from '../constants/keys';
import axios from 'axios';
const xmlParser = new xml2js.Parser();

export default {
  getAlipayPaymentUrl: async user => {
    const formData = new AlipayFormData();
    // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
    formData.setMethod('get');

    formData.addField(
      'notifyUrl',
      'https://www.zhiyingguihua.com:7500/payment/signPayment'
    );

    formData.addField('returnUrl', 'https://www.zhiyingguihua.com/');

    formData.addField('bizContent', {
      outTradeNo: uuid.v1(),
      productCode: 'FAST_INSTANT_TRADE_PAY',
      totalAmount: '360',
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

    const data = postData;

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
  },

  getWechatPaymentQRUrl: async user => {
    const getTradeId = () => {
      const time = new Date().getTime().toString();
      const random = ((0.1 + Math.random()) * 100000 + '').slice(1, 5);
      return `zygh${time}${random}`;
    };

    const payNotifyUrl =
      'https://www.zhiyingguihua.com:7500/payment/signWeChatPayment';
    const appId = 'wxcb31ae60f6a99cb9';
    const mchId = '1560899221';
    const nonceStr = uuid.v1().replace(/-/g, '');
    const price = 1;
    const productIntro = 'VIP志愿卡（黑龙江专用）';
    const attach = user.uuid;
    const tradeId = getTradeId();

    let stringA =
      'appid=' +
      appId +
      '&attach=' +
      attach +
      '&body=' +
      productIntro +
      '&mch_id=' +
      mchId +
      '&nonce_str=' +
      nonceStr +
      '&notify_url=' +
      payNotifyUrl +
      '&out_trade_no=' +
      tradeId +
      '&total_fee=' +
      price +
      '&trade_type=NATIVE';
    const stringSignTemp = stringA + '&key=' + WECHAT_KEY;
    const prePaySign = md5(stringSignTemp).toUpperCase();

    const sendData =
      '<xml>' +
      '<appid>' +
      appId +
      '</appid>' +
      '<attach>' +
      attach +
      '</attach>' +
      '<body>' +
      productIntro +
      '</body>' +
      '<mch_id>' +
      mchId +
      '</mch_id>' +
      '<nonce_str>' +
      nonceStr +
      '</nonce_str>' +
      '<notify_url>' +
      payNotifyUrl +
      '</notify_url>' +
      '<out_trade_no>' +
      tradeId +
      '</out_trade_no>' +
      '<total_fee>' +
      price +
      '</total_fee>' +
      '<trade_type>NATIVE</trade_type>' +
      '<sign>' +
      prePaySign +
      '</sign>' +
      '</xml>';

    try {
      let wxResponse = await axios.post(
        'https://api.mch.weixin.qq.com/pay/unifiedorder',
        sendData
      );
      let res = await xmlParser.parseStringPromise(wxResponse.data);

      if (res.xml.return_code[0] === 'SUCCESS') {
        const prepayId = res.xml.prepay_id[0];
        return res.xml.code_url[0];
      }
    } catch (error) {
      console.error(error);
    }
  },

  signWeChatPayment: async postData => {
    try {
      // let xmlObj = JSON.parse(res);
      let xmlObj = postData.xml;
      // console.log('res:', res);
      console.log('xmlObj:', xmlObj);

      let stringA = '';
      const keys = Object.keys(xmlObj);
      keys.sort();
      keys.forEach(key => {
        if (xmlObj[key] && key !== 'sign') {
          stringA = `${stringA}${key}=${xmlObj[key][0]}&`;
        }
      });
      stringA = `${stringA}key=${WECHAT_KEY}`;

      console.log(stringA);

      const localSign = md5(stringA).toUpperCase();

      console.log(localSign);
      // 存数据库
      await paymentDao.insertWeChatPayment({
        transactionId: xmlObj.transaction_id,
        totalFee: xmlObj.total_fee,
        resultCode: localSign === xmlObj.sign[0],
        timeEnd: xmlObj.time_end,
        userUuid: xmlObj.attach
      });

      if (localSign === xmlObj.sign[0]) {
        // 修改用户使用次数
        const role = await systemDao.selectRoleByCode(2);
        await userDao.updateUserTimes({
          userUuid: xmlObj.attach,
          roleCode: 2,
          scoreAlterTime: role.scoreAlterTime,
          reportAlterTime: role.reportAlterTime,
          deepAlterTime: role.deepAlterTime
        });

        return 'SUCCESS';
      } else {
        return 'FAIL';
      }
    } catch (error) {
      console.error(error);
      return 'FAIL';
    }
  }
};
