import voluntaryDao from '../dao/voluntary-dao';

// uuid
import uuid from 'uuid/v1';

let voluntaryName = ['志愿A', '志愿B', '志愿C', '志愿D', '志愿E'];

// 判断6个志愿是不是完整了
let verifyMajor = voluntaryList => {
  let unWriteMajorArr = [];

  for (let i = 0; i <= 5; i++) {
    // 如果没有查到
    if (voluntaryList.findIndex(item => i === item.major_index) === -1) {
      unWriteMajorArr.push(`专业${i + 1}`);
    }
  }

  return unWriteMajorArr;
};

let lotsVoluntaryStrategy = {
  // 提前批
  1: voluntaryList => {
    let unWriteSchoolArr = [];

    // 判断两个志愿全不全
    for (let i = 0; i < 2; i++) {
      if (
        voluntaryList.findIndex(item => item.fk_five_volunteer_id === i + 1) ===
        -1
      ) {
        // 如果没找到
        unWriteSchoolArr.push(`未填写${voluntaryName[i]}`);
      } else {
        let unWriteMajorArr = verifyMajor(
          voluntaryList.filter(item => item.fk_five_volunteer_id === i + 1)
        );
        unWriteSchoolArr.push(`${voluntaryName[i]}的${unWriteMajorArr}未填写`);
      }
    }

    return unWriteSchoolArr;
  },
  // 一批A
  2: voluntaryList => {
    let unWriteSchoolArr = [];
    // 判断五个志愿全不全
    for (let i = 0; i < 4; i++) {
      if (
        voluntaryList.findIndex(item => item.fk_five_volunteer_id === i + 1) ===
        -1
      ) {
        // 如果没找到
        unWriteSchoolArr.push(`未填写${voluntaryName[i]}`);
      } else {
        let unWriteMajorArr = verifyMajor(
          voluntaryList.filter(item => item.fk_five_volunteer_id === i + 1)
        );
        unWriteSchoolArr.push(`${voluntaryName[i]}的${unWriteMajorArr}未填写`);
      }
    }

    return unWriteSchoolArr;
  },
  // 一批B
  3: voluntaryList => {},
  // 二批A
  4: voluntaryList => {
    let unWriteSchoolArr = [];
    // 判断五个志愿全不全
    for (let i = 0; i < 4; i++) {
      if (
        voluntaryList.findIndex(item => item.fk_five_volunteer_id === i + 1) ===
        -1
      ) {
        // 如果没找到
        unWriteSchoolArr.push(`未填写${voluntaryName[i]}`);
      } else {
        let unWriteMajorArr = verifyMajor(
          voluntaryList.filter(item => item.fk_five_volunteer_id === i + 1)
        );
        unWriteSchoolArr.push(`${voluntaryName[i]}的${unWriteMajorArr}未填写`);
      }
    }

    return unWriteSchoolArr;
  },
  // 二批B
  5: voluntaryList => {},
  // 三批
  6: voluntaryList => {
    let unWriteSchoolArr = [];
    // 判断五个志愿全不全
    for (let i = 0; i < 4; i++) {
      if (
        voluntaryList.findIndex(item => item.fk_five_volunteer_id === i + 1) ===
        -1
      ) {
        // 如果没找到
        unWriteSchoolArr.push(`未填写${voluntaryName[i]}`);
      } else {
        let unWriteMajorArr = verifyMajor(
          voluntaryList.filter(item => item.fk_five_volunteer_id === i + 1)
        );
        unWriteSchoolArr.push(`${voluntaryName[i]}的${unWriteMajorArr}未填写`);
      }
    }

    return unWriteSchoolArr;
  },
  // 专科
  7: voluntaryList => {
    let unWriteSchoolArr = [];
    // 判断五个志愿全不全
    for (let i = 0; i < 4; i++) {
      if (
        voluntaryList.findIndex(item => item.fk_five_volunteer_id === i + 1) ===
        -1
      ) {
        // 如果没找到
        unWriteSchoolArr.push(`未填写${voluntaryName[i]}`);
      } else {
        let unWriteMajorArr = verifyMajor(
          voluntaryList.filter(item => item.fk_five_volunteer_id === i + 1)
        );
        unWriteSchoolArr.push(`${voluntaryName[i]}的${unWriteMajorArr}未填写`);
      }
    }

    return unWriteSchoolArr;
  }
};

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
      }
    };
    // 这里计算结果
    let voluntaryList = await voluntaryDao.queryVoluntaryResult(voluntaryUuid);

    /**
		 * [ RowDataPacket {
				uuid: 'da683460-e264-11e9-acd5-bbdc6c1e075a',
				fk_five_volunteer_id: 1,
				volunteer_name: 'A志愿',
				fk_school_id: 1,
				name: '哈理工',
				fk_major_id: 520,
				major_name: '地球信息科学与技术',
				major_index: 0,
				submit_time: '2019-09-29 10:57:20.040',
				fk_lots_id: 1,
				lots_name: '提前批',
				gather: 'a' },
			RowDataPacket {
				uuid: 'da683460-e264-11e9-acd5-bbdc6c1e075a',
				fk_five_volunteer_id: 1,
				volunteer_name: 'A志愿',
				fk_school_id: 1,
				name: '哈理工',
				fk_major_id: 310,
				major_name: '通信工程',
				major_index: 1,
				submit_time: '2019-09-29 10:57:20.040',
				fk_lots_id: 1,
				lots_name: '提前批',
				gather: 'a' } ]
		 * 
		 */

    if (!voluntaryList.length) {
      // 如果有志愿
      // 将志愿的基本信息保存到返回对象中
      result.submitTime = voluntaryList[0].submit_time;
      result.lotsName = voluntaryList[0].lots_name;
    }

    // 判断完备性
    let unWriteDetailArr = lotsVoluntaryStrategy[voluntaryList[0].fk_lots_id](
      voluntaryList
    );
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

    return result;
  }
};
