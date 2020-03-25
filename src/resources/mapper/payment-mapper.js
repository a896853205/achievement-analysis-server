export default {
  insertPayment: `
    INSERT
    INTO
    t_payment
    (tradeNo, buyerId, buyerLogonId, totalAmount, receiptAmount, buyerPayAmount, subject, gmtCreate, gmtPayment, gmtClose, userUuid, isSuccess, outTradeNo)
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?)
  `,
  insertWeChatPayment: `
    INSERT
    INTO
    t_wechat_payment
    (transactionId, totalFee, resultCode, timeEnd, userUuid)
    VALUES
    (?, ?, ?, ?, ?)
  `
};
