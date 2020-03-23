import AlipaySdk from 'alipay-sdk';
import fs from 'fs';
import path from 'path';

export default new AlipaySdk({
  // 参考下方 SDK 配置
  appId: '2019121069819226',
  privateKey: fs.readFileSync(
    path.resolve(__dirname, '../ssl/alipay-private-key.pem'),
    'ascii'
  ),
  alipayPublicKey: fs.readFileSync(
    path.resolve(__dirname, '../ssl/alipay-public-key.pem'),
    'ascii'
  )
});
