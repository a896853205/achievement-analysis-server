// 数据库操作
import { db, SqlObject } from '../resources/db-connect';

// 数据库语句
import userMapper from '../resources/mapper/user-mapper';

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
    scoreAlterTime
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
          uuid
        ])
      );

      let user = await db.query(new SqlObject(userMapper.selectByUuid, [uuid]));

      return user[0];
    } catch (error) {
      console.log(error);
    }
  },

  updateUserBasic: async ({ nickname, phone, email, address, uuid }) => {
    let [provinceCode, cityCode, areaCode] = address;
    await db.query(
      new SqlObject(userMapper.updateBasicInfo, [
        nickname,
        phone,
        email,
        provinceCode,
        cityCode,
        areaCode,
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
    uuid
  }) => {
    await db.query(
      new SqlObject(userMapper.updateImportInfo, [
        examYear,
        gender,
        accountCategory,
        score,
        scoreAlterTime,
        uuid
      ])
    );

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
  }
};
