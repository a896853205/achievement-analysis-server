// 数据库操作
import { db, SqlObject } from '../resources/db-connect';

// 数据库语句
import voluntaryMapper from '../resources/mapper/voluntary-mapper';
import userMapper from '../resources/mapper/user-mapper';

// 算法
import { initVoluntaryOption } from './voluntary-filtrate';

export default {
  saveVoluntary: async (allParam, user, reportType) => {
    // 在这里使用事件处理
    // 插入voluntary 而且 将 用户的测评次数-1

    // 将好多行的数组放到这行的数组中去.
    let insertVoluntary = new SqlObject(voluntaryMapper.insertVoluntary, [
        allParam
      ]),
      updateUserCount;

    // 普通报表
    if (reportType === 1) {
      updateUserCount = new SqlObject(userMapper.updateReportAlterTime, [
        user.reportAlterTime - 1,
        user.uuid
      ]);
      // 深度报表
    } else if (reportType === 2) {
      updateUserCount = new SqlObject(userMapper.updateDeepAlterTime, [
        user.deepAlterTime - 1,
        user.uuid
      ]);
    }

    await db.transactions([insertVoluntary, updateUserCount]);
  },

  queryVoluntaryResult: async voluntaryUuid => {
    let voluntaryList = await db.query(
      new SqlObject(voluntaryMapper.queryVoluntaryByVoluntaryUuid, [
        voluntaryUuid
      ])
    );

    return voluntaryList;
  },

  /**
   * 通过用户uuid查询志愿情况
   */
  queryVoluntaryByUserUuid: async userUuid => {
    let voluntaryList = await db.query(
      new SqlObject(voluntaryMapper.queryVoluntaryByUserUuid, [userUuid])
    );

    // 去重进行处理
    let unique = new Map();
    return voluntaryList.filter(o => !unique.has(o.uuid) && unique.set(o.uuid));
  },

  queryVoluntaryListByVoluntaryUuid: async voluntaryUuid => {
    let voluntaryList = await db.query(
      new SqlObject(voluntaryMapper.queryVoluntaryListByVoluntaryUuid, [
        voluntaryUuid
      ])
    );

    return initVoluntaryOption(voluntaryList);
  },

  selectVoluntaryResultByVolunteerAndMajorIndex: async (
    voluntaryUuid,
    voluntarieerId,
    majorIndex
  ) => {
    return (
      await db.query(
        new SqlObject(
          voluntaryMapper.selectVoluntaryResultByVolunteerAndMajorIndex,
          [voluntarieerId, majorIndex, voluntaryUuid]
        )
      )
    )[0];
  },

  saveTempVoluntary: async (voluntaryStr, userUuid) => {
    let tempVoluntaryArr = await db.query(
      new SqlObject(voluntaryMapper.selectTempVoluntary, [userUuid])
    );

    if (!tempVoluntaryArr.length) {
      await db.query(
        new SqlObject(voluntaryMapper.insertTempVoluntary, [
          voluntaryStr,
          userUuid
        ])
      );
    } else {
      await db.query(
        new SqlObject(voluntaryMapper.updateTempVoluntary, [
          voluntaryStr,
          userUuid
        ])
      );
    }
  },

  selectTempVoluntary: async userUuid => {
    return (
      await db.query(
        new SqlObject(voluntaryMapper.selectTempVoluntary, [userUuid])
      )
    )[0];
  }
};
