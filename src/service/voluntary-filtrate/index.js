const VOLUNTARY_NAME = ['志愿A', '志愿B', '志愿C', '志愿D', '志愿E'];

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

export const voluntaryCompleteStrategy = {
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
        unWriteSchoolArr.push(`未填写${VOLUNTARY_NAME[i]}`);
      } else {
        let unWriteMajorArr = verifyMajor(
          voluntaryList.filter(item => item.fk_five_volunteer_id === i + 1)
        );

        if (unWriteMajorArr.length) {
          unWriteSchoolArr.push(
            `${VOLUNTARY_NAME[i]}的${unWriteMajorArr}未填写`
          );
        }
      }
    }

    return unWriteSchoolArr;
  },
  // 一批A
  2: voluntaryList => {
    let unWriteSchoolArr = [];
    // 判断五个志愿全不全
    for (let i = 0; i <= 4; i++) {
      if (
        voluntaryList.findIndex(item => item.fk_five_volunteer_id === i + 1) ===
        -1
      ) {
        // 如果没找到
        unWriteSchoolArr.push(`未填写${VOLUNTARY_NAME[i]}`);
      } else {
        let unWriteMajorArr = verifyMajor(
          voluntaryList.filter(item => item.fk_five_volunteer_id === i + 1)
        );

        if (unWriteMajorArr.length) {
          unWriteSchoolArr.push(
            `${VOLUNTARY_NAME[i]}的${unWriteMajorArr}未填写`
          );
        }
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
    for (let i = 0; i <= 4; i++) {
      if (
        voluntaryList.findIndex(item => item.fk_five_volunteer_id === i + 1) ===
        -1
      ) {
        // 如果没找到
        unWriteSchoolArr.push(`未填写${VOLUNTARY_NAME[i]}`);
      } else {
        let unWriteMajorArr = verifyMajor(
          voluntaryList.filter(item => item.fk_five_volunteer_id === i + 1)
        );

        if (unWriteMajorArr.length) {
          unWriteSchoolArr.push(
            `${VOLUNTARY_NAME[i]}的${unWriteMajorArr}未填写`
          );
        }
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
    for (let i = 0; i <= 4; i++) {
      if (
        voluntaryList.findIndex(item => item.fk_five_volunteer_id === i + 1) ===
        -1
      ) {
        // 如果没找到
        unWriteSchoolArr.push(`未填写${VOLUNTARY_NAME[i]}`);
      } else {
        let unWriteMajorArr = verifyMajor(
          voluntaryList.filter(item => item.fk_five_volunteer_id === i + 1)
        );

        if (unWriteMajorArr.length) {
          unWriteSchoolArr.push(
            `${VOLUNTARY_NAME[i]}的${unWriteMajorArr}未填写`
          );
        }
      }
    }

    return unWriteSchoolArr;
  },
  // 专科
  7: voluntaryList => {
    let unWriteSchoolArr = [];
    // 判断五个志愿全不全
    for (let i = 0; i <= 4; i++) {
      if (
        voluntaryList.findIndex(item => item.fk_five_volunteer_id === i + 1) ===
        -1
      ) {
        // 如果没找到
        unWriteSchoolArr.push(`未填写${VOLUNTARY_NAME[i]}`);
      } else {
        let unWriteMajorArr = verifyMajor(
          voluntaryList.filter(item => item.fk_five_volunteer_id === i + 1)
        );

        if (unWriteMajorArr.length) {
          unWriteSchoolArr.push(
            `${VOLUNTARY_NAME[i]}的${unWriteMajorArr}未填写`
          );
        }
      }
    }

    return unWriteSchoolArr;
  }
};

/**
 * A志愿不能从(D,E)集合中选.
 * B志愿不能从(E)集合选
 * C志愿不能从(A,E)集合选
 * D志愿不能从(A,B)集合选
 * E志愿不能从(A,B,C,D)集合选
 */
const _verifyGradeStrategy = {
  1: (voluntaryObj, gatherOption) => {
    if (voluntaryObj.gather === 'd' || voluntaryObj.gather === 'e') {
      return `${VOLUNTARY_NAME[0]}应选择“冲”类高校，${
        voluntaryObj.name
      }不属于“冲”类高校，推荐考生在${gatherOption.a}中选择。`;
    }
  },
  2: (voluntaryObj, gatherOption) => {
    if (voluntaryObj.gather === 'e') {
      return `${VOLUNTARY_NAME[1]}应选择“冲”和“稳”类高校，${
        voluntaryObj.name
      }不属于“冲”和“稳”类高校，推荐考生在${gatherOption.b}和${
        gatherOption.c
      }中选择。`;
    }
  },
  3: (voluntaryObj, gatherOption) => {
    if (voluntaryObj.gather === 'a' || voluntaryObj.gather === 'e') {
      return `${VOLUNTARY_NAME[2]}应选择“稳”类高校，${
        voluntaryObj.name
      }不属于“稳”类高校，推荐考生在${gatherOption.c}中选择。`;
    }
  },
  4: (voluntaryObj, gatherOption) => {
    if (voluntaryObj.gather === 'a' || voluntaryObj.gather === 'b') {
      return `${VOLUNTARY_NAME[3]}应选择“保”类高校，${
        voluntaryObj.name
      }不属于“保”类高校，推荐考生在${gatherOption.d}和${
        gatherOption.e
      }中选择。`;
    }
  },
  5: (voluntaryObj, gatherOption) => {
    if (
      voluntaryObj.gather === 'a' ||
      voluntaryObj.gather === 'b' ||
      voluntaryObj.gather === 'd' ||
      voluntaryObj.gather === 'c'
    ) {
      return `${VOLUNTARY_NAME[4]}应选择“保”类高校中最为保底的，${
        voluntaryObj.name
      }不属于“保”类高校，推荐考生在${gatherOption.e}中选择。`;
    }
  }
};

export const voluntaryGradedStrategy = {
  // 提前批
  1: (voluntaryList, gatherOption) => {
    return [];
  },
  // 一批A
  2: (voluntaryList, gatherOption) => {
    // 判断不能志愿都一样
    let gradeDetailArr = [];

    // 第一步判断一下是不是从一个集合里选出来的
    // 记录集合个数
    let gatherNum = {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0
    };

    for (let item of voluntaryList) {
      gatherNum[item.gather]++;
    }
    for (let key in gatherNum) {
      if (gatherNum[key] === 5) {
        let schoolName = [];
        for (let item of voluntaryList) {
          schoolName.push(item.name);
        }
        gradeDetailArr.push(
          `${schoolName}输入筛选集合${gatherOption[key]},如按此方式填报会造成浪费志愿情况，考生请谨慎选择!`
        );
      }
    }

    // 第二步判断合理性
    // 将学校去重
    let schoolArr = [];
    for (let item of voluntaryList) {
      schoolArr[item.fk_five_volunteer_id - 1] = item;
    }
    for (let item of schoolArr) {
      if (item) {
        let detailMsg = _verifyGradeStrategy[item.fk_five_volunteer_id](
          item,
          gatherOption
        );
        if (detailMsg) {
          gradeDetailArr.push(detailMsg);
        }
      }
    }

    return gradeDetailArr;
  },
  // 一批B
  3: (voluntaryList, gatherOption) => {
    return [];
  },
  // 二批A
  4: (voluntaryList, gatherOption) => {
    // 判断不能志愿都一样
    let gradeDetailArr = [];

    // 第一步判断一下是不是从一个集合里选出来的
    // 记录集合个数
    let gatherNum = {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0
    };

    for (let item of voluntaryList) {
      gatherNum[item.gather]++;
    }
    for (let key in gatherNum) {
      if (gatherNum[key] === 5) {
        let schoolName = [];
        for (let item of voluntaryList) {
          schoolName.push(item.name);
        }
        gradeDetailArr.push(
          `${schoolName}输入筛选集合${gatherOption[key]},如按此方式填报会造成浪费志愿情况，考生请谨慎选择!`
        );
      }
    }

    // 第二步判断合理性
    // 学校去重
    let schoolArr = [];
    for (let item of voluntaryList) {
      schoolArr[item.fk_five_volunteer_id - 1] = item;
    }

    for (let item of schoolArr) {
      if (item) {
        let detailMsg = _verifyGradeStrategy[item.fk_five_volunteer_id](
          item,
          gatherOption
        );
        if (detailMsg) {
          gradeDetailArr.push(detailMsg);
        }
      }
    }

    return gradeDetailArr;
  },
  // 二批B
  5: (voluntaryList, gatherOption) => {
    return [];
  },
  // 三批
  6: (voluntaryList, gatherOption) => {
    // 判断不能志愿都一样
    let gradeDetailArr = [];

    // 第一步判断一下是不是从一个集合里选出来的
    // 记录集合个数
    let gatherNum = {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0
    };

    for (let item of voluntaryList) {
      gatherNum[item.gather]++;
    }
    for (let key in gatherNum) {
      if (item) {
        if (gatherNum[key] === 5) {
          let schoolName = [];
          for (let item of voluntaryList) {
            schoolName.push(item.name);
          }
          gradeDetailArr.push(
            `${schoolName}输入筛选集合${gatherOption[key]},如按此方式填报会造成浪费志愿情况，考生请谨慎选择!`
          );
        }
      }
    }

    // 第二步判断合理性
    // 学校去重
    let schoolArr = [];
    for (let item of voluntaryList) {
      schoolArr[item.fk_five_volunteer_id - 1] = item;
    }
    for (let item of schoolArr) {
      let detailMsg = _verifyGradeStrategy[item.fk_five_volunteer_id](
        item,
        gatherOption
      );
      if (detailMsg) {
        gradeDetailArr.push(detailMsg);
      }
    }

    return gradeDetailArr;
  },
  // 专科
  7: (voluntaryList, gatherOption) => {
    // 判断不能志愿都一样
    let gradeDetailArr = [];

    // 第一步判断一下是不是从一个集合里选出来的
    // 记录集合个数
    let gatherNum = {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0
    };

    for (let item of voluntaryList) {
      gatherNum[item.gather]++;
    }
    for (let key in gatherNum) {
      if (item) {
        if (gatherNum[key] === 5) {
          let schoolName = [];
          for (let item of voluntaryList) {
            schoolName.push(item.name);
          }
          gradeDetailArr.push(
            `${schoolName}输入筛选集合${gatherOption[key]},如按此方式填报会造成浪费志愿情况，考生请谨慎选择!`
          );
        }
      }
    }

    // 第二步判断合理性
    // 学校去重
    let schoolArr = [];
    for (let item of voluntaryList) {
      schoolArr[item.fk_five_volunteer_id - 1] = item;
    }
    for (let item of schoolArr) {
      let detailMsg = _verifyGradeStrategy[item.fk_five_volunteer_id](
        item,
        gatherOption
      );
      if (detailMsg) {
        gradeDetailArr.push(detailMsg);
      }
    }

    return gradeDetailArr;
  }
};

export const voluntaryScoreStrategy = {
  // 提前批
  1: voluntaryList => {
    let schoolScoreArr = [];
    schoolScoreArr.length = 2;

    for (let item of voluntaryList) {
      schoolScoreArr[item.fk_five_volunteer_id - 1] = item.score;
    }

    return schoolScoreArr;
  },
  2: voluntaryList => {
    let schoolScoreArr = [];
    schoolScoreArr.length = 5;

    for (let item of voluntaryList) {
      schoolScoreArr[item.fk_five_volunteer_id - 1] = item.score;
    }

    return schoolScoreArr;
  },
  3: voluntaryList => {
    let schoolScoreArr = [];
    schoolScoreArr.length = 1;

    for (let item of voluntaryList) {
      schoolScoreArr[item.fk_five_volunteer_id - 1] = item.score;
    }

    return schoolScoreArr;
  },
  4: voluntaryList => {
    let schoolScoreArr = [];
    schoolScoreArr.length = 5;

    for (let item of voluntaryList) {
      schoolScoreArr[item.fk_five_volunteer_id - 1] = item.score;
    }

    return schoolScoreArr;
  },
  5: voluntaryList => {
    let schoolScoreArr = [];
    schoolScoreArr.length = 1;

    for (let item of voluntaryList) {
      schoolScoreArr[item.fk_five_volunteer_id - 1] = item.score;
    }

    return schoolScoreArr;
  },
  6: voluntaryList => {
    let schoolScoreArr = [];
    schoolScoreArr.length = 5;

    for (let item of voluntaryList) {
      schoolScoreArr[item.fk_five_volunteer_id - 1] = item.score;
    }

    return schoolScoreArr;
  },
  7: voluntaryList => {
    let schoolScoreArr = [];
    schoolScoreArr.length = 5;

    for (let item of voluntaryList) {
      schoolScoreArr[item.fk_five_volunteer_id - 1] = item.score;
    }

    return schoolScoreArr;
  }
};

export const voluntaryPlanStrategy = {
  1: voluntaryList => {
    let planDetailArr = [];
    // 开始弄专业入学人数
    let schoolArr = [];

    for (let item of voluntaryList) {
      schoolArr[item.fk_five_volunteer_id - 1] = item;
    }

    schoolArr.forEach(item => {
      if (item.enrollment && item.enrollment < 30) {
        planDetailArr.push(`${item.name}计划招生人数较少`);
      }
    });

    return planDetailArr;
  },
  2: voluntaryList => {
    let planDetailArr = [];
    // 开始弄专业入学人数
    let schoolArr = [];

    for (let item of voluntaryList) {
      schoolArr[item.fk_five_volunteer_id - 1] = item;
    }

    schoolArr.forEach(item => {
      if (item.enrollment && item.enrollment < 30) {
        planDetailArr.push(`${item.name}计划招生人数较少`);
      }
    });

    return planDetailArr;
  },
  3: voluntaryList => {
    let planDetailArr = [];
    // 开始弄专业入学人数
    let schoolArr = [];

    for (let item of voluntaryList) {
      schoolArr[item.fk_five_volunteer_id - 1] = item;
    }

    schoolArr.forEach(item => {
      if (item.enrollment && item.enrollment < 30) {
        planDetailArr.push(`${item.name}计划招生人数较少`);
      }
    });

    return planDetailArr;
  },
  4: voluntaryList => {
    let planDetailArr = [];
    // 开始弄专业入学人数
    let schoolArr = [];

    for (let item of voluntaryList) {
      schoolArr[item.fk_five_volunteer_id - 1] = item;
    }

    schoolArr.forEach(item => {
      if (item.enrollment && item.enrollment < 30) {
        planDetailArr.push(`${item.name}计划招生人数较少`);
      }
    });

    return planDetailArr;
  },
  5: voluntaryList => {
    let planDetailArr = [];
    // 开始弄专业入学人数
    let schoolArr = [];

    for (let item of voluntaryList) {
      schoolArr[item.fk_five_volunteer_id - 1] = item;
    }

    schoolArr.forEach(item => {
      if (item.enrollment && item.enrollment < 30) {
        planDetailArr.push(`${item.name}计划招生人数较少`);
      }
    });

    return planDetailArr;
  },
  6: voluntaryList => {
    let planDetailArr = [];
    // 开始弄专业入学人数
    let schoolArr = [];

    for (let item of voluntaryList) {
      schoolArr[item.fk_five_volunteer_id - 1] = item;
    }

    schoolArr.forEach(item => {
      if (item.enrollment && item.enrollment < 30) {
        planDetailArr.push(`${item.name}计划招生人数较少`);
      }
    });

    return planDetailArr;
  },
  7: voluntaryList => {
    let planDetailArr = [];
    // 开始弄专业入学人数
    let schoolArr = [];

    for (let item of voluntaryList) {
      schoolArr[item.fk_five_volunteer_id - 1] = item;
    }

    schoolArr.forEach(item => {
      if (item.enrollment && item.enrollment < 30) {
        planDetailArr.push(`${item.name}计划招生人数较少`);
      }
    });

    return planDetailArr;
  }
};

/**
 * 发展前景报告决策规则
 * 第一位 b 本科 z 专科
 * 第二位 1 公办 2 民办 c 成人
 * 第三四位 对应sys_t_school_type
 * 第五位 1 985 2 211
 * 第六七位 L3 小于300 B3 大于300
 * 第八九位 L2 小于200 L4 大于200小于400 B4 大于400
 */
const DEEP_RULE = [
  { rule: 'b1__1____', value: 1 },
  { rule: 'b1122____', value: 2 },
  { rule: 'b1042____', value: 3 },
  { rule: 'b1__2____', value: 4 },
  { rule: 'b106_L3__', value: 5 },
  { rule: 'b106_B3__', value: 6 },
  { rule: 'b113___L2', value: 7 },
  { rule: 'b113___L4', value: 8 },
  { rule: 'b113___B4', value: 9 },
  { rule: 'b112___L2', value: 10 },
  { rule: 'b112___L4', value: 11 },
  { rule: 'b112___B4', value: 12 },
  { rule: 'b116_L3__', value: 13 },
  { rule: 'b116_B3__', value: 14 },
  { rule: 'b104_____', value: 15 },
  { rule: 'b109_L3__', value: 16 },
  { rule: 'b109_B3__', value: 17 },
  { rule: 'b101_____', value: 18 },
  { rule: 'b1_______', value: 19 },
  { rule: 'b216_____', value: 20 },
  { rule: 'b212_____', value: 21 },
  { rule: 'b213_____', value: 22 },
  { rule: 'b215_____', value: 23 },
  { rule: 'b2_______', value: 24 },
  { rule: 'z112_____', value: 25 },
  { rule: 'z113_____', value: 26 },
  { rule: 'z109_____', value: 27 },
  { rule: 'z106_____', value: 28 },
  { rule: 'z110_____', value: 29 },
  { rule: 'z104_____', value: 30 },
  { rule: 'z111_____', value: 31 },
  { rule: 'z114_____', value: 32 },
  { rule: 'z116_____', value: 33 },
  { rule: 'z1_______', value: 34 },
  { rule: 'z2_______', value: 35 },
  { rule: 'c1_______', value: 36 },
  { rule: 'b1_______', value: 37 },
  { rule: 'b________', value: 38 },
  { rule: 'z________', value: 39 },
  { rule: '_________', value: 40 }
];

/**
 * 向上查找数组, index就是对应其原来id
 */
const DEEP_FATHER = [
  -1,
  4,
  4,
  4,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  24,
  24,
  24,
  24,
  24,
  34,
  34,
  34,
  34,
  34,
  34,
  34,
  34,
  34,
  34,
  37,
  37,
  37,
  38,
  39,
  40,
  -1
];

const useDeepRule = schoolDeepString => {
  for (let RULE_ITEM of DEEP_RULE) {
    let ruleArr = RULE_ITEM.rule.split(''),
      schoolDeepArr = schoolDeepString.split(''),
      isSame = true;

    for (let i = 0; i < ruleArr.length; i++) {
      let ruleItem = ruleArr[i];

      if (ruleItem === '_') {
        continue;
      } else {
        if (schoolDeepArr[i] !== ruleArr[i]) {
          isSame = false;
        }
      }
    }

    if (isSame) {
      return RULE_ITEM.value;
    }
  }
};

/**
 * 计算深度层次的id
 * @param {String} arrangement 层次
 * @param {Number} nature 类别 e.g. 1公办 2民办
 * @param {Number} type 类型 e.g. 13综合类
 * @param {Number} property 属性 e.g. 1985
 * @param {Number} rank 排名
 */
export const culDeepId = (arrangement, nature, type, property, rank) => {
  let schoolDeepString = '';

  // 层次化成字符串参数
  switch (arrangement) {
    case '本科':
      schoolDeepString += 'b';
      break;
    case '专科':
      schoolDeepString += 'z';
      break;
    default:
      schoolDeepString += '_';
  }

  // 类别化成字符串参数
  if (nature) {
    schoolDeepString += nature;
  } else {
    schoolDeepString += '_';
  }

  // 类型化成字符串参数
  if (type) {
    if (type < 10) {
      type = '0' + type;
    }
    schoolDeepString += type;
  } else {
    schoolDeepString += '__';
  }

  // 属性化成字符串参数
  if (property) {
    schoolDeepString += property;
  } else {
    schoolDeepString += '_';
  }

  // 将第一段分数化成字符串参数
  if (rank) {
    if (rank > 0 && rank <= 300) {
      schoolDeepString += 'L3';
    } else {
      schoolDeepString += 'B3';
    }
  } else {
    schoolDeepString += '__';
  }

  // 将第二段分数化成字符串参数
  if (rank) {
    if (rank > 0 && rank <= 200) {
      schoolDeepString += 'L2';
    } else if (rank > 200 && rank <= 400) {
      schoolDeepString += 'L4';
    } else {
      schoolDeepString += 'B4';
    }
  } else {
    schoolDeepString += '__';
  }

  console.log(schoolDeepString);
  return useDeepRule(schoolDeepString);
};

export const findDeepFatherId = (analysisId) => {
  return DEEP_FATHER[analysisId];
}
