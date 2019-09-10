import { TOKEN_KEY } from '../src/constants/keys';

import jwt from 'jsonwebtoken';

// TOKEN配置项
class Opation {
  constructor() {
    this.duration = Math.floor(Date.now() / 1000) + 60 * 60 * 2;
    this.secret = TOKEN_KEY;
  }
}

export default {
  /**
   * 生成token
   */
  parseToken: data => {
    let opation = new Opation();

    return jwt.sign(
      {
        data,
        iat: opation.duration
      }, opation.secret
    );
  },

  /**
   * 解析token
   */
  resolveToken: async token => {
    let opation = new Opation(),
      obj = await jwt.verify(token, opation.secret);
    
      return obj.data;
  }
}