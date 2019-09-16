// dao
import userDao from '../dao/user-dao';
import webToken from '../../util/token';

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
  setUserInfo: async (nickname, gender, score, accountCategory, addressProvince, examYear, uuid) => {
    if (nickname === undefined
      || nickname === null
      || gender === undefined
      || gender === null
      || score === undefined
      || score === null
      || accountCategory === undefined
      || accountCategory === null
      || addressProvince === undefined
      || addressProvince === null
      ) {
        return;
    } else {
      
      let result = await userDao.updateUser({nickname, gender, score, accountCategory, confirm: 1, addressProvince, examYear, uuid});
      
      return result;
    }
  },

  getUserInfo: async uuid => {
    let result = await userDao.selectByUuid(uuid);
    
    return result;
  },

  // 修改密码
  alterPassword: async (oldPassword, newPassword, userPassword, userUuid) => {
    if (oldPassword === userPassword) {
      return await userDao.updateUserPassword(newPassword, userUuid);
    } else {
      return;
    }
  }
  // 注册

}