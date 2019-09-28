// 工具类
import { objectHelper } from '../../../util/object-helper';

let initMajorObj = itemObj => {
  return {
    fk_major_id: itemObj.fk_major_id,
    major_name: itemObj.major_name,
    major_index: itemObj.major_index
  };
};

let initSchoolObj = itemObj => {
  return {
    fk_five_volunteer_id: itemObj.fk_five_volunteer_id,
    volunteer_name: itemObj.volunteer_name,
    fk_school_id: itemObj.fk_school_id,
    name: itemObj.name,
    gather: itemObj.gather,
    major: [initMajorObj(itemObj)]
  };
};

// 初始化志愿的学校
let initVoluntaryObj = itemObj => {
  return {
    uuid: itemObj.uuid,
    fk_lots_id: itemObj.fk_lots_id,
    lots_name: itemObj.lots_name,
    submit_time: itemObj.submit_time,
    school: [initSchoolObj(itemObj)]
  };
};

export const initVoluntary = voluntaryList => {
  let resultVoluntaryList = [];

  for (let i = 0; i < voluntaryList.length; i++) {
    // 如果有就不新建voluntarySchool
    if (
      !voluntaryList[i] || resultVoluntaryList.findIndex(resultItem => {
        if (resultItem) {
          return voluntaryList[i].uuid === resultItem.uuid;
        }
      }) !== -1
    ) {
      continue;
    }

    let oneVoluntary = initVoluntaryObj(voluntaryList[i]);
    voluntaryList[i] = null;

    for (let j = i + 1; j < voluntaryList.length; j++) {
      // 同一个志愿
      if (oneVoluntary.uuid === voluntaryList[j].uuid) {
        // 没有那个志愿的话就插入该志愿
        let schoolIndexSameIndex = oneVoluntary.school.findIndex(resultItem => {
          return (
            voluntaryList[j].fk_five_volunteer_id ===
            resultItem.fk_five_volunteer_id
          );
        });

        if (schoolIndexSameIndex === -1) {
          oneVoluntary.school.push(initSchoolObj(voluntaryList[j]));
          voluntaryList[j] = null;
        } else {
          // 有这个志愿,需要看看是不是一个专业
          // 如果不是一个专业就插入
          let majorIndexSameIndex = oneVoluntary.school[schoolIndexSameIndex].major.findIndex(resultItem => {
            return voluntaryList[j].major_index === resultItem.major_index;
          });

          if (majorIndexSameIndex === -1) {
            oneVoluntary.school[schoolIndexSameIndex].major.push(
              initMajorObj(voluntaryList[j])
            );
            voluntaryList[j] = null;
          }
        }
      }
    }

    resultVoluntaryList.push(oneVoluntary);
  }

  return resultVoluntaryList;
};
