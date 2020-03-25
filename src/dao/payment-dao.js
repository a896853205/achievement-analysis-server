import { db, SqlObject } from '../resources/db-connect';

import paymentMapper from '../resources/mapper/payment-mapper';

export default {
  insertWeChatPayment: async ({
    transactionId,
    totalFee,
    resultCode,
    timeEnd,
    userUuid
  }) => {
    return await db.query(
      new SqlObject(paymentMapper.insertWeChatPayment, [
        transactionId,
        totalFee,
        resultCode,
        timeEnd,
        userUuid
      ])
    );
  },
  insertPayment: async ({
    tradeNo,
    buyerId,
    buyerLogonId,
    totalAmount,
    receiptAmount,
    buyerPayAmount,
    subject,
    gmtCreate,
    gmtPayment,
    gmtClose,
    userUuid,
    isSuccess,
    outTradeNo
  }) => {
    return await db.query(
      new SqlObject(paymentMapper.insertPayment, [
        tradeNo,
        buyerId,
        buyerLogonId,
        totalAmount,
        receiptAmount,
        buyerPayAmount,
        subject,
        gmtCreate,
        gmtPayment,
        gmtClose,
        userUuid,
        isSuccess,
        outTradeNo
      ])
    );
  }
};
