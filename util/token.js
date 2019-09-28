import { TOKEN_KEY } from '../src/constants/keys';

import jwt from 'jsonwebtoken';

// TOKEN配置项
class Opation {
  constructor() {
    this.duration = Math.floor(Date.now() / 1000) + 60 * 60 * 24* 7;
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
        exp: opation.duration
      }, opation.secret
    );
  },

  /**
   * 解析token
   */
  resolveToken: async token => {
    let opation = new Opation(),
      obj = null;

    try {
      obj = jwt.verify(token.split(' ')[1], opation.secret);
    } catch (error) {
      throw error;
    }
    
    return obj.data;
  }
}