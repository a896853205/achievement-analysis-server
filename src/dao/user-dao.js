// 数据库操作
import { db, SqlObject } from '../resources/db-connect';

// 数据库语句
import userMapper from '../resources/mapper/user-mapper';
import voluntaryMapper from '../resources/mapper/voluntary-mapper';

export default {
  // 通过uuid查询用户
  selectByUuid: async uuid => {
    let user = await db.query(new SqlObject(userMapper.selectByUuid, [uuid]));

    return user[0];
  },

  // 通过username查询用户
  selectByUserName: async userName => {
    let user = await db.query(
      new SqlObject(userMapper.selectByUserName, [userName])
    );

    return user[0];
  },

  // 设置用户基本信息
  updateUser: async ({
    nickname,
    gender,
    score,
    accountCategory,
    address,
    examYear,
    uuid,
    phone,
    email,
    scoreAlterTime,
    highSchool
  }) => {
    try {
      let [provinceCode, cityCode, areaCode] = address;
      await db.query(
        new SqlObject(userMapper.update, [
          nickname,
          gender,
          phone,
          email,
          score,
          accountCategory,
          provinceCode,
          cityCode,
          areaCode,
          examYear,
          scoreAlterTime,
          highSchool,
          uuid
        ])
      );

      let user = await db.query(new SqlObject(userMapper.selectByUuid, [uuid]));

      return user[0];
    } catch (error) {
      console.log(error);
    }
  },

  updateUserBasic: async ({
    nickname,
    phone,
    email,
    address,
    uuid,
    highSchool
  }) => {
    let [provinceCode, cityCode, areaCode] = address;
    await db.query(
      new SqlObject(userMapper.updateBasicInfo, [
        nickname,
        phone,
        email,
        provinceCode,
        cityCode,
        areaCode,
        highSchool,
        uuid
      ])
    );

    let user = await db.query(new SqlObject(userMapper.selectByUuid, [uuid]));

    return user[0];
  },

  updateUserImport: async ({
    examYear,
    gender,
    accountCategory,
    score,
    scoreAlterTime,
    uuid,
    reportAlterTime,
    deepAlterTime
  }) => {
    // 更新重要信息时需要删除当前暂存志愿表
    await db.transactions([
      new SqlObject(userMapper.updateImportInfo, [
        examYear,
        gender,
        accountCategory,
        score,
        scoreAlterTime,
        reportAlterTime,
        deepAlterTime,
        uuid
      ]),
      new SqlObject(voluntaryMapper.deleteTempVoluntary, [uuid])
    ]);

    let user = await db.query(new SqlObject(userMapper.selectByUuid, [uuid]));

    return user[0];
  },

  // 修改密码
  updateUserPassword: async (newPassword, userUuid) => {
    return await db.query(
      new SqlObject(userMapper.updatePassword, [newPassword, userUuid])
    );
  },

  //注册新用户
  saveUser: async ({
    username,
    password,
    userUuid,
    roleCode,
    scoreAlterTime,
    reportAlterTime,
    deepAlterTime
  }) => {
    return await db.query(
      new SqlObject(userMapper.saveUser, [
        username,
        password,
        userUuid,
        roleCode,
        scoreAlterTime,
        reportAlterTime,
        deepAlterTime
      ])
    );
  },

  savePhoneCode: async ({ phone, code }) => {
    let res = await db.query(new SqlObject(userMapper.selectUserCode, [phone]));

    if (res && res.length) {
      await db.query(new SqlObject(userMapper.updateUserCode, [code, phone]));
    } else {
      await db.query(new SqlObject(userMapper.insertUserCode, [phone, code]));
    }
  },

  selectUserCode: async ({ phone }) => {
    return await db.query(new SqlObject(userMapper.selectUserCode, [phone]));
  }
};
