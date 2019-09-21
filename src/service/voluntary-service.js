import voluntaryDao from '../dao/voluntary-dao';

// uuid
import uuid from 'uuid/v1';

export default {
	// 保存志愿信息
	saveVoluntary: async (lotId, voluntary, user) => {
		let voluntaryUuid = undefined;

		if (user.simulated_count > 0) {
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

      // 没有填写志愿
      if (!allParam.length) {
        return -1;
      }

			await voluntaryDao.saveVoluntary(allParam, user);
		} else {
      // 没有次数了
      return 0;
    }

		// 一切正确,token生成
		return voluntaryUuid;
	},

	culVoluntaryResult: async (voluntaryUuid) => {
		// 这里计算结果
		return { content: '有问题!还是没有问题!' };
	}
};
