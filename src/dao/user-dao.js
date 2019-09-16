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
    let user = await db.query(new SqlObject(userMapper.selectByUserName, [userName]));

    return user[0];
  },

  // 设置用户基本信息
  updateUser: async ({nickname, gender, score, accountCategory, confirm, addressProvince, examYear, uuid}) => {
    try {
      
      await db.query(new SqlObject(userMapper.update, [nickname, gender, score, accountCategory, addressProvince, confirm, examYear, uuid]));
      
      let user = await db.query(new SqlObject(userMapper.selectByUuid, [uuid]));

      return user[0];
    } catch (error) {
      console.log(error);
    }
  },

  // 修改密码
  updateUserPassword: async (newPassword, userUuid) => {
    return await db.query(new SqlObject(userMapper.updatePassword, [newPassword, userUuid]));
  }
}
