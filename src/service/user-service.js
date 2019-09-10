import userDao from '../dao/user-dao';
// import uuid from 'uuid/v1';

export default {
  // 登录
  login: async (userName, passWord) => {
    let user = await userDao.selectByUserName(userName);

    if (!user || user.password !== passWord) {
      // 没有此用户或者密码不正确

      return;
    }

    return user;
  }
  // 注册

}