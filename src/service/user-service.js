// dao
import userDao from '../dao/user-dao';
import webToken from '../../util/token';
// import uuid from 'uuid/v1';

export default {
  // 登录
  login: async (userName, passWord) => {
    let user = await userDao.selectByUserName(userName);

    if (!user || user.password !== passWord) {
      // 没有此用户或者密码不正确

      return;
    }

    // 一切正确,token生成
    return {
      token: webToken.parseToken({
        uuid: user.uuid,
        role: user.role
      }),
      user
    }
  },
  setUserInfo: async (gender, score, accountCategory, uuid) => {
    if (gender === undefined
      || gender === null
      || score === undefined
      || score === null
      || accountCategory === undefined
      || accountCategory === null
      ) {
        return;
    } else {
      let result = await userDao.updateUser({gender, score, accountCategory, confirm: 1, uuid});
      return result;
    }
  }
  // 注册

}