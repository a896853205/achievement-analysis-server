// 工具类
import { objectHelper } from '../../../util/object-helper';

export const initMajor = majorList => {
  // {
  // enrollment_id: 9896,
  // school_id: 16,
  // major_id: 4411,
  // major_name: '英语',
  // major_code: null,
  // comment: '（招英语考生）',
  // major_category_id: null,
  // tuition: 5500,
  // education_system: '四年',
  // enrollment: null,
  // score: 570,
  // year: 2016,
  // lot_id: 2,
  // lot_name: '一批A' }
  let resultMajorList = [];

  for (let i = 0; i < majorList.length; i++) {
    // 如果被处理过了就跳过
    if (
      resultMajorList.find(
        resultItem => majorList[i].major_id === resultItem.major_id
      )
    ) {
      continue;
    }

    // 把一样的专业放在一起
    let oneMajorArr = [majorList[i]];

    for (let j = i + 1; j < majorList.length; j++) {
      if (majorList[i].major_id === majorList[j].major_id) {
        oneMajorArr.push(majorList[j]);
      }
    }

    let oneMajorObj = objectHelper.deepCopy(majorList[i]);

    oneMajorObj.scoreAndRank = [];

    for (let major of oneMajorArr) {
      // 分数年份和招生人数存入数组里
      if (!oneMajorObj.scoreAndRank.find(item => item.year === major.year)) {
        oneMajorObj.scoreAndRank.push({
          year: major.year,
          score: major.score,
          enrollment: major.enrollment
        });
      }
    }

    delete oneMajorObj.year;
    delete oneMajorObj.score;

    resultMajorList.push(oneMajorObj);
  }

  return resultMajorList;
};
