// 数据库操作
import { db, SqlObject } from '../resources/db-connect';

// 数据库语句
import voluntaryMapper from '../resources/mapper/voluntary-mapper';
import userMapper from '../resources/mapper/user-mapper';

// 算法
import { initVoluntaryOption } from './voluntary-filtrate';

export default {
    // 将生成报表次数减少1
    updateReportAlterTimeDrop1: async (reportAlterTime, uuid) => {
        const result = db.query(new SqlObject(userMapper.updateReportAlterTime, [
            reportAlterTime,
            uuid
        ]));

        return result;
    },
    // 将深度体验次数减少1
    updateDeepAlterTimeDrop1: async (deepAlterTime, uuid) => {
        const result = db.query(new SqlObject(userMapper.updateDeepAlterTime, [
            deepAlterTime,
            uuid
        ]));

        return result;
    },
    // ffff
    queryVoluntarySchoolAndMajorByVoluntaryUuid: async (voluntaryUuid) => {
        let volunteerData = await db.query(new SqlObject(voluntaryMapper.queryVoluntarySchoolAndMajorByVoluntaryUuid, [
            voluntaryUuid
        ]));
        return volunteerData;
    },
    // ffff
    getLotIdByVoluntaryUuid: async (voluntaryUuid) => {
        const lotId = await db.query(new SqlObject(voluntaryMapper.getLotIdByVoluntaryUuid, [
            voluntaryUuid
        ]));
        return lotId;
    },
    saveVoluntary: async (allParam, user, reportType) => {
        // 在这里使用事件处理
        // 插入voluntary 而且 将 用户的测评次数-1
        //   console.log(allParam[allParam.length - 1], 8888888);
        //   await allParam.forEach(item => {
        //       db.query(
        //           new SqlObject(voluntaryMapper.insertVoluntary2, [
        //               item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8], item[9], item[10], item[11], item[12]
        //           ])
        //       );
        //   });
        // 将好多行的数组放到这行的数组中去.
        let insertVoluntary = new SqlObject(voluntaryMapper.insertVoluntary, [
            allParam
        ]);

        // 普通报表
        /*  if (reportType === 1) {
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
          }*/

        await db.transactions([insertVoluntary]);
    },

    queryVoluntaryResult: async voluntaryUuid => {
        let voluntaryList = await db.query(
            // new SqlObject(voluntaryMapper.queryVoluntaryByVoluntaryUuid, [
            //   voluntaryUuid
            // ])
            new SqlObject(voluntaryMapper.queryVoluntaryByVoluntaryUuid2, [
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
            new SqlObject(voluntaryMapper.queryVoluntaryByUserUuid2, [userUuid])
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
        return (await db.query(
                new SqlObject(
                    voluntaryMapper.selectVoluntaryResultByVolunteerAndMajorIndex,
                    [voluntarieerId, majorIndex, voluntaryUuid]
                )
            ))[0];
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
