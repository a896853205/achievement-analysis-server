// dao
import userDao from '../dao/user-dao';
import schoolDao from '../dao/school-dao';
import systemDao from '../dao/system-dao';
import Core from '@alicloud/pop-core';

// 算法函数
import { parseCurrentScore, computeLotsScoreDifferMsg } from './rank-filtrate';

import webToken from '../../util/token';

import { ACCESS_KEY_ID, ACCESS_KEY_SECRET } from '../constants/keys';

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
      let result;
      // 用户为1的时候 是游客 初始化次数
      if(userRole == 1){
          const role = await systemDao.selectRoleByCode(userRole);
          result = await userDao.updateUserImport({
              examYear,
              gender,
              accountCategory,
              score,
              scoreAlterTime,
              uuid,
              reportAlterTime: role.reportAlterTime,
              deepAlterTime: role.deepAlterTime
          });
      }else { // 用户是vip的时候，说明生成报表和深度体验的次数已经赋值完毕了，所以这里不需要再修改，只需要更新分数修改次数即可
          result = await userDao.updateUserImport2({
              examYear,
              gender,
              accountCategory,
              score,
              scoreAlterTime,
              uuid
          });
      }
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
  },

  saveVerifyCode: async username => {
    const strNumRandom = () => {
        let radomNum = Math.floor(Math.random() * 10);
            if (radomNum === 0) {
                radomNum++;
            }
        return radomNum;
      },
      codeLength = 4;

    let code = '';

    for (let i = 0; i < codeLength; i++) {
      code += strNumRandom();
    }

    let client = new Core({
      accessKeyId: ACCESS_KEY_ID,
      accessKeySecret: ACCESS_KEY_SECRET,
      endpoint: 'https://dysmsapi.aliyuncs.com',
      apiVersion: '2017-05-25'
    });

    let param = {
      RegionId: 'cn-beijing',
      TemplateCode: 'SMS_186576082',
      PhoneNumbers: `${username}`,
      TemplateParam: `{code:${code}}`,
      SignName: '智赢学业规划网'
    };

    let requestOption = {
      method: 'POST'
    };

    let result = null;
    try {
      result = await client.request('SendSms', param, requestOption);
    } catch (error) {
      console.log(error.code);

      if (error.code === 'isv.BUSINESS_LIMIT_CONTROL') {
        return '短时间内发送短信过多,请稍后再试';
      } else if (error.code === 'isv.MOBILE_NUMBER_ILLEGAL') {
        return '电话号码不正确';
      } else {
        return '错误';
      }
    }

    if (result && result.Code === 'OK') {
      // save username和code
      await userDao.savePhoneCode({
        phone: username,
        code
      });
    }

    return 'success';
  },

  checkPhoneCode: async (username, code) => {
    let res = await userDao.selectUserCode({ phone: username });

    if (res && res.length) {
      console.log(res, code);
      if (res[0].code === code) {
        return 'success';
      } else {
        return '验证码错误';
      }
    } else {
      return '请获取验证码';
    }
  }
};
