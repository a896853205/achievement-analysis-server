// 数据库操作
import { db, SqlObject } from '../resources/db-connect';

// 数据库语句
import voluntaryMapper from '../resources/mapper/voluntary-mapper';
import userMapper from '../resources/mapper/user-mapper';

// uuid
import uuid from 'uuid/v1';

export default {
	saveVoluntary: async (lotId, voluntary, user) => {
		// 在这里使用事件处理
		// 插入voluntary 而且 将 用户的测评次数-1

		let allParam = [],
			voluntaryUuid = uuid();

		for (let schoolOption of voluntary) {
			schoolOption.major.forEach((majorOption, majorIndex) => {
        
        if (majorOption.majorId) {
          let param = [];

					param.push(
						voluntaryUuid,
						schoolOption.five_volunteer_id,
						schoolOption.schoolId,
						majorOption.majorId,
            majorIndex,
            new Date(),
						lotId,
						user.uuid
          );
          
          allParam.push(param);
				}
			});
    }

		// 将好多行的数组放到这行的数组中去.
		let sqlInsertVoluntary = new SqlObject(voluntaryMapper.insertVoluntary, [allParam]),
    updateUserCount = new SqlObject(userMapper.updateSimulatedCount, [user.simulated_count - 1, user.uuid]);
    
    await db.transactions([sqlInsertVoluntary, updateUserCount]);

    return voluntaryUuid;
	}
};
