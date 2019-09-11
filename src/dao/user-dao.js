// 数据库操作
import { db, SqlObject } from '../resources/db-connect';

// 数据库语句
import userMapper from '../resources/mapper/user-mapper';
import Result from '../../util/response';

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
  updateUser: async params => {
    let result = await db.query(new SqlObject(userMapper.update, [...params]));

    return result;
  }
}
