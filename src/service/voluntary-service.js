import voluntaryDao from '../dao/voluntary-dao';

// uuid
import uuid from 'uuid/v1';

import {
  voluntaryCompleteStrategy,
  voluntaryGradedStrategy
} from './voluntary-filtrate';

export default {
  // 保存志愿信息
  saveVoluntary: async (lotId, voluntary, user) => {
    let voluntaryUuid = uuid();

    if (user.simulatedCount > 0) {
      let allParam = [];

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
              user.uuid,
              schoolOption.gender,
              schoolOption.year,
              // user.poverty,
              schoolOption.gather
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

  culVoluntaryResult: async voluntaryUuid => {
    let result = {
      submitTime: undefined,
      lotsName: undefined,
      // 完整性结果
      completeResult: {
        reasonable: false,
        describe: '',
        unWriteDetailArr: []
      },
      gradedResult: {
        reasonable: false,
        describe: '',
        gradedDetailArr: []
      }
    };
    // 这里计算结果
    let voluntaryList = await voluntaryDao.queryVoluntaryResult(voluntaryUuid);

    /**
		 * [ RowDataPacket {
          uuid: '9a07e380-e29a-11e9-9298-0160416baceb',
          fk_five_volunteer_id: 1,
          volunteer_name: 'A志愿',
          fk_school_id: 1,
          name: '哈理工',
          fk_major_id: 520,
          major_name: '地球信息科学与技术',
          major_index: 0,
          submit_time: '2019-09-29 17:22:04.857',
          fk_lots_id: 1,
          year: 2019,
          lots_name: '提前批',
          gather: 'a',
          score: 590 },
        RowDataPacket {
          uuid: '9a07e380-e29a-11e9-9298-0160416baceb',
          fk_five_volunteer_id: 1,
          volunteer_name: 'A志愿',
          fk_school_id: 1,
          name: '哈理工',
          fk_major_id: 310,
          major_name: '通信工程',
          major_index: 5,
          submit_time: '2019-09-29 17:22:04.857',
          fk_lots_id: 1,
          year: 2019,
          lots_name: '提前批',
          gather: 'a',
          score: 590 } ]
		 * 
		 */
    console.dir(voluntaryList);

    if (voluntaryList.length) {
      // 如果有志愿
      // 将志愿的基本信息保存到返回对象中
      result.submitTime = voluntaryList[0].submit_time;
      result.lotsName = voluntaryList[0].lots_name;

      // 第一项判断完备性
      let unWriteDetailArr = voluntaryCompleteStrategy[
        voluntaryList[0].fk_lots_id
      ](voluntaryList);

      if (unWriteDetailArr.length) {
        result.completeResult.unWriteDetailArr = unWriteDetailArr;
        result.completeResult.describe =
          '请考生完整填写志愿表，以免造成滑档情况!';
        result.completeResult.reasonable = false;
      } else {
        result.completeResult.describe =
          '志愿完备性合理,如果您另外的条件均合理,则恭喜您可以按照该志愿填报了,祝您金榜题名!';
        result.completeResult.reasonable = true;
      }

      // 第二项判断梯度性
      let gradedDetailArr = voluntaryGradedStrategy[
        voluntaryList[0].fk_lots_id
      ](voluntaryList);

      if (gradedDetailArr.length) {
        result.gradedResult.gradedDetailArr = gradedDetailArr;
        result.gradedResult.describe =
          '如按此方式填报会造成滑档情况,考生请谨慎选择!';
        result.gradedResult.reasonable = false;
      } else {
        result.gradedResult.describe =
          '志愿梯度性合理,如果您另外的条件均合理,则恭喜您可以按照该志愿填报了,祝您金榜题名!';
        result.gradedResult.reasonable = true;
      }
    }

    return result;
  }
};
