import {objectHelper} from "../../../util/object-helper";

const VOLUNTARY_NAME = ['志愿A', '志愿B', '志愿C', '志愿D', '志愿E','志愿F', '志愿G', '志愿H', '志愿I', '志愿J'];

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
    // 提前批，两个志愿
    1: voluntaryList => {
        let unWriteSchoolArr = [];

        // 判断两个志愿全不全
        for (let i = 0; i < 2; i++) {
            if (
                voluntaryList.findIndex(item => item.fk_five_volunteer_id === i + 1) ===
                -1
            ) {
                // 如果没找到
                unWriteSchoolArr.push(`${VOLUNTARY_NAME[i]}未填写。    `);
            } else {
                let unWriteMajorArr = verifyMajor(
                    voluntaryList.filter(item => item.fk_five_volunteer_id === i + 1)
                );

                if (unWriteMajorArr.length) {
                    unWriteSchoolArr.push(
                        `${VOLUNTARY_NAME[i]}的${unWriteMajorArr}未填写。    `
                    );
                }
            }
        }

        return unWriteSchoolArr;
    },
    // 一批A，五个志愿
    2: voluntaryList => {
        let unWriteSchoolArr = [];
        // 判断五个志愿全不全
        for (let i = 0; i <= 4; i++) {
            if (
                voluntaryList.findIndex(item => item.fk_five_volunteer_id === i + 1) ===
                -1
            ) {
                // 如果没找到
                unWriteSchoolArr.push(`${VOLUNTARY_NAME[i]}未填写。    `);
            } else {
                let unWriteMajorArr = verifyMajor(
                    voluntaryList.filter(item => item.fk_five_volunteer_id === i + 1)
                );

                if (unWriteMajorArr.length) {
                    unWriteSchoolArr.push(
                        `${VOLUNTARY_NAME[i]}的${unWriteMajorArr}未填写。    `
                    );
                }
            }
        }

        return unWriteSchoolArr;
    },
    // 一批B，一个志愿
    3: voluntaryList => {
        let unWriteSchoolArr = [];

        // 判断1个志愿全不全
        for (let i = 0; i < 1; i++) {
            if (
                voluntaryList.findIndex(item => item.fk_five_volunteer_id === i + 1) ===
                -1
            ) {
                // 如果没找到
                unWriteSchoolArr.push(`${VOLUNTARY_NAME[i]}未填写。    `);
            } else {
                let unWriteMajorArr = verifyMajor(
                    voluntaryList.filter(item => item.fk_five_volunteer_id === i + 1)
                );

                if (unWriteMajorArr.length) {
                    unWriteSchoolArr.push(
                        `${VOLUNTARY_NAME[i]}的${unWriteMajorArr}未填写。    `
                    );
                }
            }
        }

        return unWriteSchoolArr;
    },
    // 二批A，10个志愿
    4: voluntaryList => {
        let unWriteSchoolArr = [];
        // 判断五个志愿
        //  这里改动了 二批A，变成了10个志愿
        //   console.log(voluntaryList, 333333);
        for (let i = 0; i <= 9; i++) {
            if (
                voluntaryList.findIndex(item => item.fk_five_volunteer_id === i + 1) ===
                -1
            ) {
                // 如果没找到，某一个志愿没有填
                unWriteSchoolArr.push(`${VOLUNTARY_NAME[i]}未填写。    `);
            } else {
                let unWriteMajorArr = verifyMajor(
                    voluntaryList.filter(item => item.fk_five_volunteer_id === i + 1)
                );

                if (unWriteMajorArr.length) {
                    unWriteSchoolArr.push(
                        `${VOLUNTARY_NAME[i]}的${unWriteMajorArr}未填写。    `
                    );
                }
            }
        }

        return unWriteSchoolArr;
    },
    // 二批B，一个志愿
    5: voluntaryList => {
        let unWriteSchoolArr = [];

        // 判断1个志愿全不全
        for (let i = 0; i < 1; i++) {
            if (
                voluntaryList.findIndex(item => item.fk_five_volunteer_id === i + 1) ===
                -1
            ) {
                // 如果没找到
                unWriteSchoolArr.push(`${VOLUNTARY_NAME[i]}未填写。    `);
            } else {
                let unWriteMajorArr = verifyMajor(
                    voluntaryList.filter(item => item.fk_five_volunteer_id === i + 1)
                );

                if (unWriteMajorArr.length) {
                    unWriteSchoolArr.push(
                        `${VOLUNTARY_NAME[i]}的${unWriteMajorArr}未填写。    `
                    );
                }
            }
        }

        return unWriteSchoolArr;
    },
    // 三批，取消了
    6: voluntaryList => {
        let unWriteSchoolArr = [];
        // 判断五个志愿全不全
        for (let i = 0; i <= 4; i++) {
            if (
                voluntaryList.findIndex(item => item.fk_five_volunteer_id === i + 1) ===
                -1
            ) {
                // 如果没找到
                unWriteSchoolArr.push(`${VOLUNTARY_NAME[i]}未填写。    `);
            } else {
                let unWriteMajorArr = verifyMajor(
                    voluntaryList.filter(item => item.fk_five_volunteer_id === i + 1)
                );

                if (unWriteMajorArr.length) {
                    unWriteSchoolArr.push(
                        `${VOLUNTARY_NAME[i]}的${unWriteMajorArr}未填写。    `
                    );
                }
            }
        }

        return unWriteSchoolArr;
    },
    // 专科，五个志愿
    7: voluntaryList => {
        let unWriteSchoolArr = [];
        // 判断五个志愿全不全
        for (let i = 0; i <= 4; i++) {
            if (
                voluntaryList.findIndex(item => item.fk_five_volunteer_id === i + 1) ===
                -1
            ) {
                // 如果没找到
                unWriteSchoolArr.push(`${VOLUNTARY_NAME[i]}未填写。    `);
            } else {
                let unWriteMajorArr = verifyMajor(
                    voluntaryList.filter(item => item.fk_five_volunteer_id === i + 1)
                );

                if (unWriteMajorArr.length) {
                    unWriteSchoolArr.push(
                        `${VOLUNTARY_NAME[i]}的${unWriteMajorArr}未填写。    `
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
/*const _verifyGradeStrategy = {
  1: (voluntaryObj, gatherOption) => {
    if (voluntaryObj.gather === 'd' || voluntaryObj.gather === 'e') {
      return `${VOLUNTARY_NAME[0]}应选择“冲”类高校，${voluntaryObj.name}不属于“冲”类高校，推荐考生在${gatherOption.a}中选择。`;
    }
  },
  2: (voluntaryObj, gatherOption) => {
    if (voluntaryObj.gather === 'e') {
      return `${VOLUNTARY_NAME[1]}应选择“冲”和“稳”类高校，${voluntaryObj.name}不属于“冲”和“稳”类高校，推荐考生在${gatherOption.b}和${gatherOption.c}中选择。`;
    }
  },
  3: (voluntaryObj, gatherOption) => {
    if (voluntaryObj.gather === 'a' || voluntaryObj.gather === 'e') {
      return `${VOLUNTARY_NAME[2]}应选择“稳”类高校，${voluntaryObj.name}不属于“稳”类高校，推荐考生在${gatherOption.c}中选择。`;
    }
  },
  4: (voluntaryObj, gatherOption) => {
    if (voluntaryObj.gather === 'a' || voluntaryObj.gather === 'b') {
      return `${VOLUNTARY_NAME[3]}应选择“保”类高校，${voluntaryObj.name}不属于“保”类高校，推荐考生在${gatherOption.d}和${gatherOption.e}中选择。`;
    }
  },
  5: (voluntaryObj, gatherOption) => {
    if (
      voluntaryObj.gather === 'a' ||
      voluntaryObj.gather === 'b' ||
      voluntaryObj.gather === 'd' ||
      voluntaryObj.gather === 'c'
    ) {
      return `${VOLUNTARY_NAME[4]}应选择“保”类高校中最为保底的，${voluntaryObj.name}不属于“保”类高校，推荐考生在${gatherOption.e}中选择。`;
    }
  }
};*/

/**
 * 二批A五个志愿变为十个志愿，该方法重写
 * A志愿不能从(D,E)集合中选.
 * B志愿不能从(E)集合选
 * C志愿不能从(A,E)集合选
 * D志愿不能从(A,B)集合选
 * E志愿不能从(A,B,C,D)集合选
 * F志愿
 * G志愿
 * H志愿
 * I志愿
 * J志愿
 */
const _verifyGradeStrategy = {
    1: (voluntaryObj, gatherOption) => {
        if (voluntaryObj.gather === 'd' || voluntaryObj.gather === 'e') {
            return `${VOLUNTARY_NAME[0]}应选择“冲”类高校，${voluntaryObj.name}不属于“冲”类高校，推荐考生在${gatherOption.a}中选择。`;
        }
    },
    2: (voluntaryObj, gatherOption) => {
        if (voluntaryObj.gather === 'e') {
            return `${VOLUNTARY_NAME[1]}应选择“冲”和“稳”类高校，${voluntaryObj.name}不属于“冲”和“稳”类高校，推荐考生在${gatherOption.b}和${gatherOption.c}中选择。`;
        }
    },
    3: (voluntaryObj, gatherOption) => {
        if (voluntaryObj.gather === 'a' || voluntaryObj.gather === 'e') {
            return `${VOLUNTARY_NAME[2]}应选择“稳”类高校，${voluntaryObj.name}不属于“稳”类高校，推荐考生在${gatherOption.c}中选择。`;
        }
    },
    4: (voluntaryObj, gatherOption) => {
        if (voluntaryObj.gather === 'a' || voluntaryObj.gather === 'b') {
            return `${VOLUNTARY_NAME[3]}应选择“保”类高校，${voluntaryObj.name}不属于“保”类高校，推荐考生在${gatherOption.d}和${gatherOption.e}中选择。`;
        }
    },
    5: (voluntaryObj, gatherOption) => {
        if (
            voluntaryObj.gather === 'a' ||
            voluntaryObj.gather === 'b' ||
            voluntaryObj.gather === 'd' ||
            voluntaryObj.gather === 'c'
        ) {
            return `${VOLUNTARY_NAME[4]}应选择“保”类高校中最为保底的，${voluntaryObj.name}不属于“保”类高校，推荐考生在${gatherOption.e}中选择。`;
        }
    },
    6: (voluntaryObj, gatherOption) => {
        return null;
    },
    7: (voluntaryObj, gatherOption) => {
        return null;
    },
    8: (voluntaryObj, gatherOption) => {
        return null;
    },
    9: (voluntaryObj, gatherOption) => {
        return null;
    },
    10: (voluntaryObj, gatherOption) => {
        return null;
    }
};

/*
* 对选择的集合，进一步判断合理性
*     只有（A，B）不行，
*     只有（A，C）不行，
*     只有（A，D）不行，
*     只有（A，E）不行，
*     只有（B，C）不行，
*     （B，D）先算合理，
*     只有（B，E）不行，
*     只有（A，B，C）不行
* */
const _verifyGradeStrategy2 = {
    //提前批
    1: () => {
        return null;
    },
    // 一批A
    2: (gatherNum, gatherOption) => {
        return _verifyGradeStrategy2[4](gatherNum, gatherOption);
    },
    // 一批B
    3: () => {
        return null;
    },
    // 二批A
    4: (gatherNum, gatherOption) => {
        // 只有（A）不行
        if(gatherNum['b']+gatherNum['c']+gatherNum['d']+gatherNum['e'] === 0) {
            return `所选的志愿只包含“A-${gatherOption['a']}”，不合理，建议按照推荐集合进行报考，避免滑档。    `;
        }
        // 只有（B）不行
        if(gatherNum['a']+gatherNum['c']+gatherNum['d']+gatherNum['e'] === 0) {
            return `所选的志愿只包含“B-${gatherOption['b']}”，不合理，建议按照推荐集合进行报考，避免滑档。    `;
        }
        // 只有（C）不行
        if(gatherNum['a']+gatherNum['b']+gatherNum['d']+gatherNum['e'] === 0) {
            return `所选的志愿只包含“C-${gatherOption['c']}”，不合理，建议按照推荐集合进行报考，避免滑档。    `;
        }
        // 只有（D）不行
        if(gatherNum['a']+gatherNum['b']+gatherNum['c']+gatherNum['e'] === 0) {
            return `所选的志愿只包含“D-${gatherOption['d']}”，不合理，建议按照推荐集合进行报考，避免滑档。    `;
        }
        // 只有（E）不行
        if(gatherNum['a']+gatherNum['b']+gatherNum['c']+gatherNum['d'] === 0) {
            return `所选的志愿只包含“E-${gatherOption['e']}”，不合理，建议按照推荐集合进行报考，避免滑档。    `;
        }

        // 只有（A，B）不行，
        if(gatherNum['c']+gatherNum['d']+gatherNum['e'] === 0) {
            return `所选的志愿只包含“A-${gatherOption['a']}”和“B-${gatherOption['b']}”，不合理，建议按照推荐集合进行报考，避免滑档。    `;
        }
        // 只有（A，C）不行，
        if(gatherNum['b']+gatherNum['d']+gatherNum['e'] === 0) {
            return `所选的志愿只包含“A-${gatherOption['a']}”和“C-${gatherOption['c']}”，不合理，建议按照推荐集合进行报考，避免滑档。    `;
        }
        // 只有（A，D）不行，
        if(gatherNum['b']+gatherNum['c']+gatherNum['e'] === 0) {
            return `所选的志愿只包含“A-${gatherOption['a']}”和“D-${gatherOption['d']}”，不合理，建议按照推荐集合进行报考，避免滑档。    `;
        }
        // 只有（A，E）不行，
        if(gatherNum['b']+gatherNum['c']+gatherNum['d'] === 0) {
            return `所选的志愿只包含“A-${gatherOption['a']}”和“E-${gatherOption['e']}”，不合理，建议按照推荐集合进行报考，避免滑档。    `;
        }
        // 只有（B，C）不行，
        if(gatherNum['a']+gatherNum['d']+gatherNum['e'] === 0) {
            return `所选的志愿只包含“B-${gatherOption['b']}”和“C-${gatherOption['c']}”，不合理，建议按照推荐集合进行报考，避免滑档。    `;
        }
        // （B，D）先算合理，
        // if(gatherNum['a']+gatherNum['c']+gatherNum['e'] === 0) {
        //     return `所选的志愿只包含“${gatherOption['b']}”和“${gatherOption['d']}”，不合理，建议按照推荐集合进行报考，避免滑档。    `;
        // }
        // 只有（B，E）不行，
        if(gatherNum['a']+gatherNum['c']+gatherNum['d'] === 0) {
            return `所选的志愿只包含“B-${gatherOption['b']}”和“E-${gatherOption['e']}”，不合理，建议按照推荐集合进行报考，避免滑档。    `;
        }
        // 只有（A，B，C）不行
        if(gatherNum['d']+gatherNum['e'] === 0) {
            return `所选的志愿只包含“A-${gatherOption['a']}”、“B-${gatherOption['b']}”和“C-${gatherOption['c']}”，不合理，建议按照推荐集合进行报考，避免滑档。    `;
        }

    },
    // 二批B
    5: () => {
        return null;
    },
    // 三批
    6: () => {
        return null;
    },
    // 专科
    7: (gatherNum, gatherOption) => {
        return _verifyGradeStrategy2[4](gatherNum, gatherOption);
    },
};

/*
* 分数梯度合理性判断，ABCD集合持续递减则合理,否则不合理.
* */
const scoreGradedRationality = {
    // 提前批，两个志愿，分数梯度合理性判断，两个志愿都比较，递减合理，否则不合理.
    1: schoolScoreArr => {
        let msgArr = [];
        // undefined的数据不去比较，先拿有值的索引
        let indexArr = [];
        schoolScoreArr.forEach((item, index) => {
            if (item !== undefined) {
                indexArr.push(index);
            }
        });
        console.log(indexArr, 'indexArr');
        if (indexArr.length > 0) {
            for (let i = 0; i < indexArr.length; i++) {
                if (schoolScoreArr[indexArr[i]] < schoolScoreArr[indexArr[i + 1]]) {
                    msgArr.push(`“${VOLUNTARY_NAME[indexArr[i]]}”的分数不应该小于“${VOLUNTARY_NAME[indexArr[i + 1]]}”的分数；`);
                }
            }
        }

        if (msgArr.length > 0) {
            msgArr.unshift(`整体录取分数梯度不合理：院校录取分应呈递减趋势，`);
        }
        return msgArr;
    },
    // 一批A，五个志愿，分数梯度合理性判断，只比较前四个分数，ABCD集合持续递减则合理,否则不合理.
    2: schoolScoreArr => {
        let msgArr = [];
        // undefined的数据不去比较，先拿有值的索引
        let indexArr = [];
        schoolScoreArr.forEach((item, index) => {
            if (index !== schoolScoreArr.length - 1 && item !== undefined) {
                indexArr.push(index);
            }
        });
        console.log(indexArr, 'indexArr');
        if (indexArr.length > 0) {
            for (let i = 0; i < indexArr.length; i++) {
                if (schoolScoreArr[indexArr[i]] < schoolScoreArr[indexArr[i + 1]]) {
                    msgArr.push(`“${VOLUNTARY_NAME[indexArr[i]]}”的分数不应该小于“${VOLUNTARY_NAME[indexArr[i + 1]]}”的分数；`);
                }
            }
        }

        if (msgArr.length > 0) {
            msgArr.unshift(`整体录取分数梯度不合理：前${schoolScoreArr.length - 1}个志愿里院校录取分应呈递减趋势，`);
        }
        return msgArr;
    },
    // 一批B，一个志愿，
    3: schoolScoreArr => {
        return [];
    },
    // 二批A，10个志愿，分数梯度合理性判断，只比较前四个分数，ABCD集合持续递减则合理,否则不合理.
    4: schoolScoreArr => {
        let msgArr = [];
        // undefined的数据不去比较，先拿有值的索引
        let indexArr = [];
        // 只比较前四个分数，别的随便
        let newSchoolScoreArr = [];
        for (let i = 0; i < 5; i++) { // 拿到ABCDE的分数
            newSchoolScoreArr.push(schoolScoreArr[i])
        }

        newSchoolScoreArr.forEach((item, index) => {
            if (index !== newSchoolScoreArr.length - 1 && item !== undefined) {
                indexArr.push(index);
            }
        });
        console.log(indexArr, 'indexArr');
        if (indexArr.length > 0) {
            for (let i = 0; i < indexArr.length; i++) {
                if (newSchoolScoreArr[indexArr[i]] < newSchoolScoreArr[indexArr[i + 1]]) {
                    msgArr.push(`“${VOLUNTARY_NAME[indexArr[i]]}”的分数不应该小于“${VOLUNTARY_NAME[indexArr[i + 1]]}”的分数；`);
                }
            }
        }

        if (msgArr.length > 0) {
            // msgArr.unshift(`整体录取分数梯度不合理：前${schoolScoreArr.length - 1}个志愿里院校录取分应呈递减趋势，`);
            msgArr.unshift(`整体录取分数梯度不合理：前4个志愿里院校录取分应呈递减趋势，`);
        }
        return msgArr;
    },
    // 二批B，一个志愿
    5: schoolScoreArr => {
        return [];
    },
    // 三批，取消了
    6: schoolScoreArr => {},
    // 专科，五个志愿，分数梯度合理性判断，只比较前四个分数，ABCD集合持续递减则合理,否则不合理.
    7: schoolScoreArr => {
        let msgArr = [];
        // undefined的数据不去比较，先拿有值的索引
        let indexArr = [];
        schoolScoreArr.forEach((item, index) => {
            if (index !== schoolScoreArr.length - 1 && item !== undefined) {
                indexArr.push(index);
            }
        });
        console.log(indexArr, 'indexArr');
        if (indexArr.length > 0) {
            for (let i = 0; i < indexArr.length; i++) {
                if (schoolScoreArr[indexArr[i]] < schoolScoreArr[indexArr[i + 1]]) {
                    msgArr.push(`“${VOLUNTARY_NAME[indexArr[i]]}”的分数不应该小于“${VOLUNTARY_NAME[indexArr[i + 1]]}”的分数；`);
                }
            }
        }

        if (msgArr.length > 0) {
            msgArr.unshift(`整体录取分数梯度不合理：前${schoolScoreArr.length - 1}个志愿里院校录取分应呈递减趋势，`);
        }
        return msgArr;
    }
};

const getMaxAndMinScore = schoolScoreArr => {
    let tempArr = [];
    schoolScoreArr.forEach(item => {
        if (item !== null) {
            tempArr.push(item);
        }
    });
    if (tempArr.length > 0) {
        return {
            max: Math.max(...tempArr),
            min: Math.min(...tempArr)
        }
    }else {
        return {
            max: 750,
            min: 0
        }
    }

};

export const voluntaryGradedStrategy = {

    // 提前批，两个志愿
    1: (voluntaryList, gatherOption, volunteerCount) => {
        // 判断不能志愿都一样
        let gradeDetailArr = [];
        console.log(gatherOption, 'gatherOption');
        // 处理数据，便于计算
        let tempGather = [];
        voluntaryList.forEach(item => {
            let obj = {};
            obj['fk_five_volunteer_id'] = item.fk_five_volunteer_id;
            obj['volunteer_name'] = item.volunteer_name;
            obj['fk_school_id'] = item.fk_school_id;
            obj['name'] = item.name;
            obj['fk_lots_id'] = item.fk_lots_id;
            obj['lots_name'] = item.lots_name;
            obj['gather'] = item.gather;
            obj['score'] = item.score;
            obj['enrollment1'] = item.enrollment1;
            tempGather.push(obj);
        });
        let uniqueTempGather = objectHelper.uniqueArrayObj(tempGather);
        console.log(uniqueTempGather, 'uniqueTempGather');


        // 两个志愿都填了哪个
        let fiveVolunteer = {
            1: 0,
            2: 0
        };

        for (let item of uniqueTempGather) {
            fiveVolunteer[item.fk_five_volunteer_id]++;
        }

        console.log(fiveVolunteer, 'fiveVolunteer');

        // 首先判断是否志愿数是否是2个，2个则合理，否则不合理。
        let isEnough = true;
        for (let key in fiveVolunteer) {
            if (fiveVolunteer[key] === 0) {
                isEnough = false;
                gradeDetailArr.push(`${VOLUNTARY_NAME[key - 1]}未填写； `);
            }
        }
        if (!isEnough) {
            gradeDetailArr.unshift(`志愿选择不完备：`);
        }


        // 判断选择的2个学校分数，AB集合持续递减则合理,否则不合理.
        let schoolScoreArr = voluntaryScoreStrategy[
            uniqueTempGather[0].fk_lots_id === 6 ? 4 : uniqueTempGather[0].fk_lots_id
            ](uniqueTempGather);

        console.log(schoolScoreArr, 'schoolScoreArr'); // 如果没有数据对应位置会赋值undefined
        console.log(VOLUNTARY_NAME, 'VOLUNTARY_NAME');

        // let testScoreArr = [655, 666];

        let scoreMsgArr = scoreGradedRationality[
            uniqueTempGather[0].fk_lots_id === 6 ? 4 : uniqueTempGather[0].fk_lots_id](schoolScoreArr);
        if (scoreMsgArr.length > 0) {
            gradeDetailArr.push(...scoreMsgArr);
        }

        return {
            gradeDetailArr: gradeDetailArr,
            schoolScoreArr: schoolScoreArr,
            maxAndMin: getMaxAndMinScore(schoolScoreArr)
        };
    },
    // 一批A，五个志愿
    2: (voluntaryList, gatherOption, volunteerCount) => {
        // 判断不能志愿都一样
        let gradeDetailArr = [];
        console.log(gatherOption, 'gatherOption');
        // 处理数据，便于计算
        let tempGather = [];
        voluntaryList.forEach(item => {
            let obj = {};
            obj['fk_five_volunteer_id'] = item.fk_five_volunteer_id;
            obj['volunteer_name'] = item.volunteer_name;
            obj['fk_school_id'] = item.fk_school_id;
            obj['name'] = item.name;
            obj['fk_lots_id'] = item.fk_lots_id;
            obj['lots_name'] = item.lots_name;
            obj['gather'] = item.gather;
            obj['score'] = item.score;
            obj['enrollment1'] = item.enrollment1;
            tempGather.push(obj);
        });
        let uniqueTempGather = objectHelper.uniqueArrayObj(tempGather);
        console.log(uniqueTempGather, 'uniqueTempGather');

        // 不同风险的志愿都填了几个
        let gatherNum = {
            a: 0,
            b: 0,
            c: 0,
            d: 0,
            e: 0
        };
        // 五个志愿都填了哪个
        let fiveVolunteer = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        };

        for (let item of uniqueTempGather) {
            gatherNum[item.gather]++;
            fiveVolunteer[item.fk_five_volunteer_id]++;
        }

        console.log(gatherNum, 'gatherNum');
        console.log(fiveVolunteer, 'fiveVolunteer');

        // 首先判断是否志愿数是否是5个，5个则合理，否则不合理。
        let isEnough = true;
        for (let key in fiveVolunteer) {
            if (fiveVolunteer[key] === 0) {
                isEnough = false;
                gradeDetailArr.push(`${VOLUNTARY_NAME[key - 1]}未填写； `);
            }
        }
        if (!isEnough) {
            gradeDetailArr.unshift(`志愿选择不完备：`);
        }
        // 判断是不是从一个集合理选出来的
        for (let key in gatherNum) {
            if (gatherNum[key] === volunteerCount) {
                gradeDetailArr.push(`您所有的志愿都是从“${gatherOption[key]}”中选取的，这样不合理。     `);
            }
        }

        /*
        * 对选择的集合，进一步判断合理性
        *     只有（A，B）不行，
        *     只有（A，C）不行，
        *     只有（A，D）不行，
        *     只有（A，E）不行，
        *     只有（B，C）不行，
        *     只有（B，E）不行，
        *     只有（A，B，C）不行
        * */
        let msg = _verifyGradeStrategy2[uniqueTempGather[0].fk_lots_id === 6 ? 4 : uniqueTempGather[0].fk_lots_id](
            gatherNum,
            gatherOption
        );
        if (msg) {
            gradeDetailArr.push(msg);
        }

        // 判断选择的5个学校分数，ABCD集合持续递减则合理,否则不合理.
        let schoolScoreArr = voluntaryScoreStrategy[
            uniqueTempGather[0].fk_lots_id === 6 ? 4 : uniqueTempGather[0].fk_lots_id
            ](uniqueTempGather);
        console.log(getMaxAndMinScore(schoolScoreArr), 'getMaxAndMinScore');
        // let testArr = [null, null, null, null, null];
        console.log(schoolScoreArr, 'schoolScoreArr'); // 如果没有数据对应位置会赋值undefined
        console.log(VOLUNTARY_NAME, 'VOLUNTARY_NAME');

        let scoreMsgArr = scoreGradedRationality[
            uniqueTempGather[0].fk_lots_id === 6 ? 4 : uniqueTempGather[0].fk_lots_id](schoolScoreArr);
        if (scoreMsgArr.length > 0) {
            gradeDetailArr.push(...scoreMsgArr);
        }

        return {
            gradeDetailArr: gradeDetailArr,
            schoolScoreArr: schoolScoreArr,
            maxAndMin: getMaxAndMinScore(schoolScoreArr)
        };
    },
    // 一批B，一个志愿
    3: (voluntaryList, gatherOption, volunteerCount) => {
        // 处理数据，便于计算
        let gradeDetailArr = [];
        let tempGather = [];
        voluntaryList.forEach(item => {
            let obj = {};
            obj['fk_five_volunteer_id'] = item.fk_five_volunteer_id;
            obj['volunteer_name'] = item.volunteer_name;
            obj['fk_school_id'] = item.fk_school_id;
            obj['name'] = item.name;
            obj['fk_lots_id'] = item.fk_lots_id;
            obj['lots_name'] = item.lots_name;
            obj['gather'] = item.gather;
            obj['score'] = item.score;
            obj['enrollment1'] = item.enrollment1;
            tempGather.push(obj);
        });
        let uniqueTempGather = objectHelper.uniqueArrayObj(tempGather);
        console.log(uniqueTempGather, 'uniqueTempGather');

        // 判断志愿选择完备性
        if (voluntaryCompleteStrategy[
                uniqueTempGather[0].fk_lots_id === 6 ? 4 : uniqueTempGather[0].fk_lots_id
            ](voluntaryList).length) {
            gradeDetailArr.push(`志愿完备性不合理，请考生完整填写志愿表，不要放弃任何一个机会。`);
        }

        let schoolScoreArr = voluntaryScoreStrategy[
            uniqueTempGather[0].fk_lots_id === 6 ? 4 : uniqueTempGather[0].fk_lots_id
            ](uniqueTempGather);

        console.log(schoolScoreArr, 'schoolScoreArr'); // 如果没有数据对应位置会赋值undefined
        console.log(VOLUNTARY_NAME, 'VOLUNTARY_NAME');


        return {
            gradeDetailArr: gradeDetailArr,
            schoolScoreArr: schoolScoreArr,
            maxAndMin: getMaxAndMinScore(schoolScoreArr)
        };
    },
    // 二批A，十个志愿
    4: (voluntaryList, gatherOption, volunteerCount) => {
        // 判断不能志愿都一样
        let gradeDetailArr = [];
        console.log(gatherOption, 'gatherOption');
        // 处理数据，便于计算
        let tempGather = [];
        voluntaryList.forEach(item => {
            let obj = {};
            obj['fk_five_volunteer_id'] = item.fk_five_volunteer_id;
            obj['volunteer_name'] = item.volunteer_name;
            obj['fk_school_id'] = item.fk_school_id;
            obj['name'] = item.name;
            obj['fk_lots_id'] = item.fk_lots_id;
            obj['lots_name'] = item.lots_name;
            obj['gather'] = item.gather;
            obj['score'] = item.score;
            obj['enrollment1'] = item.enrollment1;
            tempGather.push(obj);
        });
        let uniqueTempGather = objectHelper.uniqueArrayObj(tempGather);
        console.log(uniqueTempGather, 'uniqueTempGather');

        // 不同风险的志愿都填了几个
        let gatherNum = {
            a: 0,
            b: 0,
            c: 0,
            d: 0,
            e: 0
        };
        // 十个志愿都填了哪个
        let fiveVolunteer = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
        };

        for (let item of uniqueTempGather) {
            gatherNum[item.gather]++;
            fiveVolunteer[item.fk_five_volunteer_id]++;
        }

        console.log(gatherNum, 'gatherNum');
        console.log(fiveVolunteer, 'fiveVolunteer');

        // 首先判断是否志愿数是否是10个，10个则合理，否则不合理。
        let isEnough = true;
        for (let key in fiveVolunteer) {
            if (fiveVolunteer[key] === 0) {
                isEnough = false;
                gradeDetailArr.push(`${VOLUNTARY_NAME[key - 1]}未填写； `);
            }
        }
        if (!isEnough) {
            gradeDetailArr.unshift(`志愿选择不完备：`);
        }
        // 判断是不是从一个集合理选出来的
        for (let key in gatherNum) {
            if (gatherNum[key] === volunteerCount) {
                gradeDetailArr.push(`您所有的志愿都是从“${gatherOption[key]}”中选取的，这样不合理。     `);
            }
        }

        /*
        * 对选择的集合，进一步判断合理性
        *     只有（A，B）不行，
        *     只有（A，C）不行，
        *     只有（A，D）不行，
        *     只有（A，E）不行，
        *     只有（B，C）不行，
        *     只有（B，E）不行，
        *     只有（A，B，C）不行
        * */
        let msg = _verifyGradeStrategy2[uniqueTempGather[0].fk_lots_id === 6 ? 4 : uniqueTempGather[0].fk_lots_id](
            gatherNum,
            gatherOption
        );
        if (msg) {
            gradeDetailArr.push(msg);
        }

        // 判断选择的10个学校分数，ABCD集合持续递减则合理,否则不合理.
        let schoolScoreArr = voluntaryScoreStrategy[
            uniqueTempGather[0].fk_lots_id === 6 ? 4 : uniqueTempGather[0].fk_lots_id
            ](uniqueTempGather);

        console.log(schoolScoreArr, 'schoolScoreArr'); // 如果没有数据对应位置会赋值undefined
        console.log(VOLUNTARY_NAME, 'VOLUNTARY_NAME');

        // let testArr = [500, 510, undefined, 520, 530, 450, undefined, undefined, 486, 496];
        let scoreMsgArr = scoreGradedRationality[
            uniqueTempGather[0].fk_lots_id === 6 ? 4 : uniqueTempGather[0].fk_lots_id](schoolScoreArr);
        if (scoreMsgArr.length > 0) {
            gradeDetailArr.push(...scoreMsgArr);
        }

        return {
            gradeDetailArr: gradeDetailArr,
            schoolScoreArr: schoolScoreArr,
            maxAndMin: getMaxAndMinScore(schoolScoreArr)
        };
    },
    // 二批B，一个志愿
    5: (voluntaryList, gatherOption, volunteerCount) => {
        return voluntaryGradedStrategy[3](voluntaryList, gatherOption, volunteerCount);
    },
    // 三批，取消了
    6: (voluntaryList, gatherOption, volunteerCount) => {
        return {
            gradeDetailArr: [],
            schoolScoreArr: [],
            maxAndMin: []
        };
    },
    // 专科，五个志愿
    7: (voluntaryList, gatherOption, volunteerCount) => {
        return voluntaryGradedStrategy[2](voluntaryList, gatherOption, volunteerCount);
    }
};

export const voluntaryScoreStrategy = {
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
        // 二批A五个志愿改为了十个志愿
        // for (let i=0;i<13;i++) {
        //     console.log(voluntaryList[i], i);
        // }

        let schoolScoreArr = [];
        // schoolScoreArr.length = 5;
        schoolScoreArr.length = 10;

        for (let item of voluntaryList) {
            schoolScoreArr[item.fk_five_volunteer_id - 1] = item.score;
        }
        console.log(schoolScoreArr, 8888888888);
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
/*
    一批A:
    判断选择学校的专业入学人数是否小于30而且在d或e集合
    如果是则不符合大计划合理性
    如果不是则符合大计划合理性

    二批A:
    判断选择学校的专业入学人数是否小于30而且在d或e集合
    如果是则不符合大计划合理性
    如果不是则符合大计划合理性

    专科:
    判断选择学校的专业入学人数是否小于30而且在d或e集合
    如果是则不符合大计划合理性
    如果不是则符合大计划合理性
*/
export const voluntaryPlanStrategy = {
    //提前批
    1: voluntaryList => {
        return [];
    },
    // 一批A
    2: voluntaryList => {
        let planDetailArr = [];
        // 开始弄专业入学人数
        let schoolArr = [];
        for (let item of voluntaryList) {
            schoolArr[item.fk_five_volunteer_id - 1] = item;
        }
        schoolArr.forEach(item => {
            console.log(item.name, item.enrollment1, 'enrollment1');
            if (item.enrollment1 && item.enrollment1 < 30 && (item.gather === 'd' || item.gather === 'e')) {
                planDetailArr.push(`"${item.name}"${item.year - 1}的计划招生人数较少，${item.accountCategory === 1 ? '理科' : '文科'}只招了${item.enrollment1}人。   `);
            }
        });
        return planDetailArr;
    },
    // 一批B
    3: voluntaryList => {
        return [];
    },
    // 二批A
    4: voluntaryList => {
        return voluntaryPlanStrategy[2](voluntaryList);
    },
    // 二批B
    5: voluntaryList => {
        return [];
    },
    // 三批
    6: voluntaryList => {
        return [];
    },
    // 专科
    7: voluntaryList => {
        return voluntaryPlanStrategy[2](voluntaryList);
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

  return useDeepRule(schoolDeepString);
};

export const findDeepFatherId = analysisId => {
  return DEEP_FATHER[analysisId];
};
