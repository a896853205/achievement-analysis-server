import { db, SqlObject } from '../resources/db-connect';

import paymentMapper from '../resources/mapper/payment-mapper';

export default {
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
