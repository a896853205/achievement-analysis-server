// dao
import userDao from '../dao/user-dao';
import schoolDao from '../dao/school-dao';
import systemDao from '../dao/system-dao';

// 算法函数
import { parseCurrentScore, computeLotsScoreDifferMsg } from './rank-filtrate';

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
    };
  },

  setUserBasicInfo: async ({
    nickname,
    phone,
    email,
    address,
    uuid,
    highSchool
  }) => {
    let result = await userDao.updateUserBasic({
      nickname,
      phone,
      email,
      address,
      uuid,
      highSchool
    });

    return result;
  },

  setUserImportInfo: async ({
    examYear,
    gender,
    accountCategory,
    score,
    scoreAlterTime,
    uuid,
    userRole = 1
  }) => {
    // 查询权限表userRole
    let role = await systemDao.selectRoleByCode(userRole);

    // 这里判断次数,如果小于返回-1,如果还有次数就update
    let result = await userDao.updateUserImport({
      examYear,
      gender,
      accountCategory,
      score,
      scoreAlterTime,
      uuid,
      reportAlterTime: role.reportAlterTime,
      deepAlterTime: role.deepAlterTime
    });

    return result;
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
  },

  // 注册
  saveUser: async (username, password, userUuid, userRole = 1) => {
    // 查询权限表userRole
    let role = await systemDao.selectRoleByCode(userRole);

    return await userDao.saveUser({
      username,
      password,
      userUuid,
      roleCode: userRole,
      scoreAlterTime: role.scoreAlterTime,
      reportAlterTime: role.reportAlterTime,
      deepAlterTime: role.deepAlterTime
    });
  },

  //检查用户名是否存在
  checkUser: async username => {
    return await userDao.selectByUserName(username);
  },

  // 根据年份和分数计算两年内的位次和线差
  getScoreRank: async ({ score, examYear, accountCategory }) => {
    // 获取两个位次的数组 根据年份和文科理科
    let [
      { currentRank, oldRank },
      { oldOneLotsScore, currentLotsScore }
    ] = await Promise.all([
      schoolDao.queryScoreRankByCategoryAndYear(accountCategory, examYear),
      schoolDao.queryLotsScore(examYear, accountCategory)
    ]);

    // parseCurrentScore
    // 当年的分换算为当年的和去年的分数和位次
    let { fitCurrent, fitOld } = parseCurrentScore(score, currentRank, oldRank);

    let lotsScoreDifferMsg = computeLotsScoreDifferMsg(
      fitOld.score,
      oldOneLotsScore
    );

    let currentLotsScoreDifferMsg = computeLotsScoreDifferMsg(
      fitCurrent.score,
      currentLotsScore
    );

    return {
      fitCurrent,
      fitOld,
      currentLotsScoreDifferMsg,
      lotsScoreDifferMsg
    };
  }
};
