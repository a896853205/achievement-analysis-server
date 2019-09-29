// 数据库操作
import { db, SqlObject } from '../resources/db-connect';

// 数据库语句
import voluntaryMapper from '../resources/mapper/voluntary-mapper';
import userMapper from '../resources/mapper/user-mapper';

// 算法类
import { initVoluntary } from './voluntary-filtrate';

export default {
  saveVoluntary: async (allParam, user) => {
    // 在这里使用事件处理
    // 插入voluntary 而且 将 用户的测评次数-1

    // 将好多行的数组放到这行的数组中去.
    let sqlInsertVoluntary = new SqlObject(voluntaryMapper.insertVoluntary, [
        allParam
      ]),
      updateUserCount = new SqlObject(userMapper.updateSimulatedCount, [
        user.simulatedCount - 1,
        user.uuid
      ]);

    await db.transactions([sqlInsertVoluntary, updateUserCount]);
  },

  queryVoluntaryResult: async voluntaryUuid => {
    let voluntaryList = await db.query(
      new SqlObject(voluntaryMapper.queryVoluntaryByVoluntaryUuid, [
        voluntaryUuid
      ])
		);
    
    // 进行深层次处理
    // return initVoluntary(voluntaryList);
    return voluntaryList;
  }
};
