import userDao from '../dao/user-dao';
// import uuid from 'uuid/v1';
import md5 from 'md5';

export default {
  // 登录
  login: async (userName, passWord) => {
    let user = await userDao.selectByUserName(userName);

    if (!user || md5(user.password) !== passWord) {
      // 没有此用户或者密码不正确

      return;
    }

    return user;
  }
  // 注册

}