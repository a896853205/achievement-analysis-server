// 筛选学校性质
export const filtrateNatureSchool = (natureValues = [], schoolList) => {
  if (natureValues.length) {
    let fitNatureSchoolList = [];

    for (let schoolItem of schoolList) {
      let isFit = false;

      for (let natureItem of natureValues) {
        // 一旦有有一个包括就适合
        if (schoolItem.school_nature_id.includes(natureItem)) {
          isFit = true;
        }
      }

      // 如果适合就push进去
      if (isFit) {
        fitNatureSchoolList.push(schoolItem);
      }
    }

    return fitNatureSchoolList;
  } else {
    return schoolList;
  }
};

// 对学校属性进行筛选
export const filtratePropertySchool = (propertyValues = [], schoolList) => {
  if (propertyValues.length) {
    let fitPropertySchoolList = [];

    for (let schoolItem of schoolList) {
      let isFit = false;

      for (let propertyItem of propertyValues) {
        // 一旦有有一个包括就适合
        if (schoolItem.school_property_id.includes(propertyItem)) {
          isFit = true;
        }
      }

      // 如果适合就push进去
      if (isFit) {
        fitPropertySchoolList.push(schoolItem);
      }
    }

    return fitPropertySchoolList;
  } else {
    return schoolList;
  }
};

// 对高校类别进行筛选
export const filtrateTypeSchool = (typeValues = [], schoolList) => {
  if (typeValues.length) {
    let fitTypeSchoolList = [];

    for (let schoolItem of schoolList) {
      let isFit = false;

      for (let typeItem of typeValues) {
        // 一旦有有一个包括就适合
        if (schoolItem.school_type_id.includes(typeItem)) {
          isFit = true;
        }
      }

      // 如果适合就push进去
      if (isFit) {
        fitTypeSchoolList.push(schoolItem);
      }
    }

    return fitTypeSchoolList;
  } else {
    return schoolList;
  }
};

// 对地域特色进行筛选
export const filtrateAreaFeatureSchool = (
  areaFeatureValues = [],
  schoolList
) => {
  if (areaFeatureValues.length) {
    let fitTypeSchoolList = [];

    for (let schoolItem of schoolList) {
      let isFit = false;

      for (let areaFeatureItem of areaFeatureValues) {
        // 一旦有有一个包括就适合
        if (schoolItem.area_feature_id.includes(areaFeatureItem)) {
          isFit = true;
        }
      }

      // 如果适合就push进去
      if (isFit) {
        fitTypeSchoolList.push(schoolItem);
      }
    }

    return fitTypeSchoolList;
  } else {
    return schoolList;
  }
};

// 对所在省份进行筛选
export const filtrateProvinceSchool = (
  provinceListValues,
  resultSchoolList
) => {
  if (provinceListValues.length) {
    let fitTypeSchoolList = [];

    for (let schoolItem of resultSchoolList) {
      let isFit = false;

      for (let provinceListItem of provinceListValues) {
        // 一旦有有一个包括就适合
        if (schoolItem.province_id === provinceListItem) {
          isFit = true;
        }
      }

      // 如果适合就push进去
      if (isFit) {
        fitTypeSchoolList.push(schoolItem);
      }
    }

    return fitTypeSchoolList;
  } else {
    return resultSchoolList;
  }
};

// 对专业名进行筛选
export const filtrateMajorName = ({
  originalSchoolList,
  majorName,
  resultSchoolList
}) => {
  let correctSchoolIdArr = [];

  for (let item of originalSchoolList) {
    if (item.major_name && item.major_name.indexOf(majorName) !== -1) {
      correctSchoolIdArr.push(item.school_id);
    }
  }
  correctSchoolIdArr = new Set(correctSchoolIdArr);

  let schoolList = [];
  for (let item of resultSchoolList) {
    if (correctSchoolIdArr.has(item.school_id)) {
      schoolList.push(item);
    }
  }

  return schoolList;
};

export const splitSchoolByRange = (
  score,
  scoreRange,
  schoolList,
  gatherValue,
  oldYear
) => {
  // score2 = score - scoreRange.down_score_2,
  // score3 = score - scoreRange.down_score_3,

  // 最下限
  let score1 = score - scoreRange.down_score_1,
    score4 = score,
    score5 = score + scoreRange.up_score_4,
    score6 = score + scoreRange.up_score_5,
    schoolListA = [],
    schoolListB = [],
    schoolListC = [],
    schoolListD = [],
    schoolListE = [];

  for (let schoolItem of schoolList) {
    let currentSchool = schoolItem.scoreAndRank.find(item => {
      return item.year === oldYear;
    });

    if (currentSchool && currentSchool.score) {
      // 判断是否超过最高控制分数和最低控制分数
      if (currentSchool.score < score1 || currentSchool.score > score6) {
        continue;
      }

      // 开始筛选集合
      if (currentSchool.score >= score4 && currentSchool.score < score5) {
        schoolItem.gather = 'b';
        schoolListB.push(schoolItem);
        continue;
      } else if (
        currentSchool.score >= score5 &&
        currentSchool.score < score6
      ) {
        schoolItem.gather = 'a';
        schoolListA.push(schoolItem);
        continue;
      } else {
        // 不是ab集合需要判断其专业的分数情况
        let majorArr = schoolItem.major;

        // 筛选年份
        majorArr = majorArr.filter(item => {
          return item.year === oldYear;
        });

        // 排除掉分数为空的专业
        majorArr = majorArr.filter(item => {
          return item.major_score;
        });

        // 如果没有专业分的学校则是c集合
        if (!majorArr.length) {
          schoolItem.gather = 'c';
          schoolListC.push(schoolItem);
          continue;
        }

        // 分数降序排列
        majorArr.sort((prep, next) => {
          return next.major_score - prep.major_score;
        });

        // 判断分数是否比专业最高的高,如果高则是e集合
        if (score > majorArr[0].major_score) {
          schoolItem.gather = 'e';
          schoolListE.push(schoolItem);
          continue;
        }

        // 取中位数的major,大于中位数的是d集合
        let majorLength = majorArr.length;
        if (majorLength & 1) {
          // 奇数
          if (score > majorArr[(majorLength + 1) / 2 - 1].major_score) {
            schoolItem.gather = 'd';
            schoolListD.push(schoolItem);
            continue;
          }
        } else {
          // 偶数
          let prepMajor = majorArr[majorLength / 2 - 1];
          let nextMajor = majorArr[majorLength / 2];
          if (score > (prepMajor.major_score + nextMajor.major_score) / 2) {
            schoolItem.gather = 'd';
            schoolListD.push(schoolItem);
            continue;
          }
        }

        // 其他的都是c集合
        schoolItem.gather = 'c';
        schoolListC.push(schoolItem);
      }
    }
  }

  switch (gatherValue) {
    case 'a':
      return schoolListA;
    case 'b':
      return schoolListB;
    case 'c':
      return schoolListC;
    case 'd':
      return schoolListD;
    case 'e':
      return schoolListE;
    default:
      return [
        ...schoolListA,
        ...schoolListB,
        ...schoolListC,
        ...schoolListD,
        ...schoolListE
      ];
  }
};

// 计算提档概率
// 1低 2中 3高 4未知
export const culEnrollRateStrategies = {
  1: ({ stuOldOneScoreAndRank, culList, examYear }) => {
    for (let i = 0; i < culList.length; i++) {
      let oldOneScoreAndRank = culList[i].scoreAndRank.find(item => {
        return item.year === examYear - 1;
      });
      let oldTwoScoreAndRank = culList[i].scoreAndRank.find(item => {
        return item.year === examYear - 2;
      });
      let oldThreeScoreAndRank = culList[i].scoreAndRank.find(item => {
        return item.year === examYear - 3;
      });

      if (
        oldOneScoreAndRank &&
        oldTwoScoreAndRank &&
        oldThreeScoreAndRank &&
        oldOneScoreAndRank.rank &&
        oldTwoScoreAndRank.rank &&
        oldThreeScoreAndRank.rank
      ) {
        // 看看是不是比最小的小
        let avgRank = parseInt(
          (oldOneScoreAndRank.rank +
            oldTwoScoreAndRank.rank +
            oldThreeScoreAndRank.rank) /
            3
        );
        if (
          stuOldOneScoreAndRank.rank <=
          Math.min.apply(
            Math,
            culList[i].scoreAndRank.map(o => {
              return o.rank;
            })
          )
        ) {
          culList[i].enrollRate = 3;
        } else if (stuOldOneScoreAndRank.rank <= avgRank) {
          culList[i].enrollRate = 2;
        } else {
          culList[i].enrollRate = 1;
        }
      } else {
        culList[i].enrollRate = 4;
      }
    }

    return culList;
  },
  2: ({ stuOldOneScoreAndRank, culList, examYear }) => {
    for (let i = 0; i < culList.length; i++) {
      let oldOneScoreAndRank = culList[i].scoreAndRank.find(item => {
        return item.year === examYear - 3;
      });
      let oldTwoScoreAndRank = culList[i].scoreAndRank.find(item => {
        return item.year === examYear - 2;
      });
      let oldThreeScoreAndRank = culList[i].scoreAndRank.find(item => {
        return item.year === examYear - 1;
      });
      if (
        oldOneScoreAndRank &&
        oldTwoScoreAndRank &&
        oldThreeScoreAndRank &&
        oldOneScoreAndRank.rank &&
        oldTwoScoreAndRank.rank &&
        oldThreeScoreAndRank.rank
      ) {
        // 看看是不是比最小的小
        let avgRank = parseInt(
          (oldOneScoreAndRank.rank +
            oldTwoScoreAndRank.rank +
            oldThreeScoreAndRank.rank) /
            3
        );
        if (
          stuOldOneScoreAndRank.rank <=
          Math.min.apply(
            Math,
            culList[i].scoreAndRank.map(o => {
              return o.rank;
            })
          )
        ) {
          culList[i].enrollRate = 3;
        } else if (stuOldOneScoreAndRank.rank <= avgRank) {
          culList[i].enrollRate = 2;
        } else {
          culList[i].enrollRate = 1;
        }
      } else {
        culList[i].enrollRate = 4;
      }
    }

    return culList;
  },
  3: ({ stuOldOneScoreAndRank, culList, examYear }) => {
    for (let i = 0; i < culList.length; i++) {
      let oldOneScoreAndRank = culList[i].scoreAndRank.find(item => {
        return item.year === examYear - 3;
      });
      let oldTwoScoreAndRank = culList[i].scoreAndRank.find(item => {
        return item.year === examYear - 2;
      });
      let oldThreeScoreAndRank = culList[i].scoreAndRank.find(item => {
        return item.year === examYear - 1;
      });
      if (
        oldOneScoreAndRank &&
        oldTwoScoreAndRank &&
        oldThreeScoreAndRank &&
        oldOneScoreAndRank.rank &&
        oldTwoScoreAndRank.rank &&
        oldThreeScoreAndRank.rank
      ) {
        // 看看是不是比最小的小
        let avgRank = parseInt(
          (oldOneScoreAndRank.rank +
            oldTwoScoreAndRank.rank +
            oldThreeScoreAndRank.rank) /
            3
        );

        if (
          stuOldOneScoreAndRank.rank <=
          Math.min.apply(
            Math,
            culList[i].scoreAndRank.map(o => {
              return o.rank;
            })
          )
        ) {
          culList[i].enrollRate = 3;
        } else if (stuOldOneScoreAndRank.rank <= avgRank) {
          culList[i].enrollRate = 2;
        } else {
          culList[i].enrollRate = 1;
        }
      } else {
        culList[i].enrollRate = 4;
      }
    }

    return culList;
  },
  4: ({ culList, stuLineDiffer }) => {
    for (let i = 0; i < culList.length; i++) {
      let [oldOneDiffer, oldTwoDiffer, oldThreeDiffer] = culList[i].lineDiffir;
      if (oldOneDiffer && oldTwoDiffer && oldThreeDiffer) {
        let avgDiffer = parseInt(
          (oldOneDiffer + oldTwoDiffer + oldThreeDiffer) / 3
        );

        if (stuLineDiffer >= Math.max.apply(Math, culList[i].lineDiffir)) {
          culList[i].enrollRate = 3;
        } else if (stuLineDiffer >= avgDiffer) {
          culList[i].enrollRate = 2;
        } else {
          culList[i].enrollRate = 1;
        }
      } else {
        culList[i].enrollRate = 4;
      }
    }

    return culList;
  },
  5: ({ culList, stuLineDiffer }) => {
    for (let i = 0; i < culList.length; i++) {
      let [oldOneDiffer, oldTwoDiffer, oldThreeDiffer] = culList[i].lineDiffir;
      if (oldOneDiffer && oldTwoDiffer && oldThreeDiffer) {
        let avgDiffer = parseInt(
          (oldOneDiffer + oldTwoDiffer + oldThreeDiffer) / 3
        );
        if (stuLineDiffer >= Math.max.apply(Math, culList[i].lineDiffir)) {
          culList[i].enrollRate = 3;
        } else if (stuLineDiffer >= avgDiffer) {
          culList[i].enrollRate = 2;
        } else {
          culList[i].enrollRate = 1;
        }
      } else {
        culList[i].enrollRate = 4;
      }
    }

    return culList;
  },
  6: ({ culList, stuLineDiffer }) => {
    for (let i = 0; i < culList.length; i++) {
      let [oldOneDiffer, oldTwoDiffer, oldThreeDiffer] = culList[i].lineDiffir;
      if (oldOneDiffer && oldTwoDiffer && oldThreeDiffer) {
        let avgDiffer = parseInt(
          (oldOneDiffer + oldTwoDiffer + oldThreeDiffer) / 3
        );
        if (stuLineDiffer >= Math.max.apply(Math, culList[i].lineDiffir)) {
          culList[i].enrollRate = 3;
        } else if (stuLineDiffer >= avgDiffer) {
          culList[i].enrollRate = 2;
        } else {
          culList[i].enrollRate = 1;
        }
      } else {
        culList[i].enrollRate = 4;
      }
    }

    return culList;
  },
  7: ({ culList, stuLineDiffer }) => {
    for (let i = 0; i < culList.length; i++) {
      let [oldOneDiffer, oldTwoDiffer, oldThreeDiffer] = culList[i].lineDiffir;
      if (oldOneDiffer && oldTwoDiffer && oldThreeDiffer) {
        let avgDiffer = parseInt(
          (oldOneDiffer + oldTwoDiffer + oldThreeDiffer) / 3
        );

        if (stuLineDiffer >= Math.max.apply(Math, culList[i].lineDiffir)) {
          culList[i].enrollRate = 3;
        } else if (stuLineDiffer >= avgDiffer) {
          culList[i].enrollRate = 2;
        } else {
          culList[i].enrollRate = 1;
        }
      } else {
        culList[i].enrollRate = 4;
      }
    }

    return culList;
  }
};

// 阈值
const WAVE_THRESHOLD = 20;
const PLAN_THRESHOLD = 0.1;

// 计算风险系数
// 1低 2中 3高 4未知
export const culRiskRateStrategies = {
  1: ({ culList, examYear }) => {
    for (let i = 0; i < culList.length; i++) {
      let currentScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear
      );
      let oldOneScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear - 1
      );
      let oldTwoScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear - 2
      );
      let oldThreeScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear - 3
      );
      if (
        oldOneScoreAndRank.rank &&
        oldTwoScoreAndRank.rank &&
        oldThreeScoreAndRank.rank &&
        currentScoreAndRank.enrollment &&
        oldOneScoreAndRank.enrollment
      ) {
        // 三年数值都有
        let wave1,
          wave2,
          influenceFactor1,
          influenceFactor2,
          influenceFactor3,
          changeEnrollment,
          trueNum = 0;
        wave1 = Math.abs(oldOneScoreAndRank.rank - oldTwoScoreAndRank.rank);
        wave2 = Math.abs(oldTwoScoreAndRank.rank - oldThreeScoreAndRank.rank);
        influenceFactor1 = wave1 + wave2 >= WAVE_THRESHOLD;
        influenceFactor2 =
          oldOneScoreAndRank.rank > oldTwoScoreAndRank.rank &&
          oldTwoScoreAndRank.rank > oldThreeScoreAndRank.rank;
        changeEnrollment =
          oldOneScoreAndRank.enrollment - currentScoreAndRank.enrollment;
        influenceFactor3 =
          changeEnrollment > 0 &&
          changeEnrollment / oldOneScoreAndRank.enrollment > PLAN_THRESHOLD;
        if (influenceFactor1) trueNum++;
        if (influenceFactor2) trueNum++;
        if (influenceFactor3) trueNum++;
        if (trueNum >= 2) {
          culList[i].riskRate = 3;
        } else if (trueNum >= 1 && trueNum < 2) {
          culList[i].riskRate = 2;
        } else {
          culList[i].riskRate = 1;
        }
      } else {
        culList[i].riskRate = 4;
      }
    }
    return culList;
  },
  2: ({ culList, examYear }) => {
    for (let i = 0; i < culList.length; i++) {
      let currentScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear
      );
      let oldOneScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear - 1
      );
      let oldTwoScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear - 2
      );
      let oldThreeScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear - 3
      );
      if (
        oldOneScoreAndRank.rank &&
        oldTwoScoreAndRank.rank &&
        oldThreeScoreAndRank.rank &&
        currentScoreAndRank.enrollment &&
        oldOneScoreAndRank.enrollment
      ) {
        // 三年数值都有
        let wave1,
          wave2,
          influenceFactor1,
          influenceFactor2,
          influenceFactor3,
          changeEnrollment,
          trueNum = 0;
        wave1 = Math.abs(oldOneScoreAndRank.rank - oldTwoScoreAndRank.rank);
        wave2 = Math.abs(oldTwoScoreAndRank.rank - oldThreeScoreAndRank.rank);
        influenceFactor1 = wave1 + wave2 >= WAVE_THRESHOLD;
        influenceFactor2 =
          oldOneScoreAndRank.rank > oldTwoScoreAndRank.rank &&
          oldTwoScoreAndRank.rank > oldThreeScoreAndRank.rank;
        changeEnrollment =
          oldOneScoreAndRank.enrollment - currentScoreAndRank.enrollment;
        influenceFactor3 =
          changeEnrollment > 0 &&
          changeEnrollment / oldOneScoreAndRank.enrollment > PLAN_THRESHOLD;
        if (influenceFactor1) trueNum++;
        if (influenceFactor2) trueNum++;
        if (influenceFactor3) trueNum++;
        if (trueNum >= 2) {
          culList[i].riskRate = 3;
        } else if (trueNum >= 1 && trueNum < 2) {
          culList[i].riskRate = 2;
        } else {
          culList[i].riskRate = 1;
        }
      } else {
        culList[i].riskRate = 4;
      }
    }
    return culList;
  },
  3: ({ culList, examYear }) => {
    for (let i = 0; i < culList.length; i++) {
      let currentScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear
      );
      let oldOneScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear - 1
      );
      let oldTwoScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear - 2
      );
      let oldThreeScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear - 3
      );
      if (
        oldOneScoreAndRank.rank &&
        oldTwoScoreAndRank.rank &&
        oldThreeScoreAndRank.rank &&
        currentScoreAndRank.enrollment &&
        oldOneScoreAndRank.enrollment
      ) {
        // 三年数值都有
        let wave1,
          wave2,
          influenceFactor1,
          influenceFactor2,
          influenceFactor3,
          changeEnrollment,
          trueNum = 0;
        wave1 = Math.abs(oldOneScoreAndRank.rank - oldTwoScoreAndRank.rank);
        wave2 = Math.abs(oldTwoScoreAndRank.rank - oldThreeScoreAndRank.rank);
        influenceFactor1 = wave1 + wave2 >= WAVE_THRESHOLD;
        influenceFactor2 =
          oldOneScoreAndRank.rank > oldTwoScoreAndRank.rank &&
          oldTwoScoreAndRank.rank > oldThreeScoreAndRank.rank;
        changeEnrollment =
          oldOneScoreAndRank.enrollment - currentScoreAndRank.enrollment;
        influenceFactor3 =
          changeEnrollment > 0 &&
          changeEnrollment / oldOneScoreAndRank.enrollment > PLAN_THRESHOLD;
        if (influenceFactor1) trueNum++;
        if (influenceFactor2) trueNum++;
        if (influenceFactor3) trueNum++;
        if (trueNum >= 2) {
          culList[i].riskRate = 3;
        } else if (trueNum >= 1 && trueNum < 2) {
          culList[i].riskRate = 2;
        } else {
          culList[i].riskRate = 1;
        }
      } else {
        culList[i].riskRate = 4;
      }
    }
    return culList;
  },
  4: ({ culList, examYear }) => {
    for (let i = 0; i < culList.length; i++) {
      let currentScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear
      );
      let oldOneScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear - 1
      );
      let oldTwoScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear - 2
      );
      let oldThreeScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear - 3
      );
      if (
        oldOneScoreAndRank.rank &&
        oldTwoScoreAndRank.rank &&
        oldThreeScoreAndRank.rank &&
        currentScoreAndRank.enrollment &&
        oldOneScoreAndRank.enrollment
      ) {
        // 三年数值都有
        let wave1,
          wave2,
          influenceFactor1,
          influenceFactor2,
          influenceFactor3,
          changeEnrollment,
          trueNum = 0;
        wave1 = Math.abs(oldOneScoreAndRank.rank - oldTwoScoreAndRank.rank);
        wave2 = Math.abs(oldTwoScoreAndRank.rank - oldThreeScoreAndRank.rank);
        influenceFactor1 = wave1 + wave2 >= WAVE_THRESHOLD;
        influenceFactor2 =
          oldOneScoreAndRank.rank > oldTwoScoreAndRank.rank &&
          oldTwoScoreAndRank.rank > oldThreeScoreAndRank.rank;
        changeEnrollment =
          oldOneScoreAndRank.enrollment - currentScoreAndRank.enrollment;
        influenceFactor3 =
          changeEnrollment > 0 &&
          changeEnrollment / oldOneScoreAndRank.enrollment > PLAN_THRESHOLD;
        if (influenceFactor1) trueNum++;
        if (influenceFactor2) trueNum++;
        if (influenceFactor3) trueNum++;
        if (trueNum >= 2) {
          culList[i].riskRate = 3;
        } else if (trueNum >= 1 && trueNum < 2) {
          culList[i].riskRate = 2;
        } else {
          culList[i].riskRate = 1;
        }
      } else {
        culList[i].riskRate = 4;
      }
    }
    return culList;
  },
  5: ({ culList, examYear }) => {
    for (let i = 0; i < culList.length; i++) {
      let currentScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear
      );
      let oldOneScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear - 1
      );
      let oldTwoScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear - 2
      );
      let oldThreeScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear - 3
      );
      if (
        oldOneScoreAndRank.rank &&
        oldTwoScoreAndRank.rank &&
        oldThreeScoreAndRank.rank &&
        currentScoreAndRank.enrollment &&
        oldOneScoreAndRank.enrollment
      ) {
        // 三年数值都有
        let wave1,
          wave2,
          influenceFactor1,
          influenceFactor2,
          influenceFactor3,
          changeEnrollment,
          trueNum = 0;
        wave1 = Math.abs(oldOneScoreAndRank.rank - oldTwoScoreAndRank.rank);
        wave2 = Math.abs(oldTwoScoreAndRank.rank - oldThreeScoreAndRank.rank);
        influenceFactor1 = wave1 + wave2 >= WAVE_THRESHOLD;
        influenceFactor2 =
          oldOneScoreAndRank.rank > oldTwoScoreAndRank.rank &&
          oldTwoScoreAndRank.rank > oldThreeScoreAndRank.rank;
        changeEnrollment =
          oldOneScoreAndRank.enrollment - currentScoreAndRank.enrollment;
        influenceFactor3 =
          changeEnrollment > 0 &&
          changeEnrollment / oldOneScoreAndRank.enrollment > PLAN_THRESHOLD;
        if (influenceFactor1) trueNum++;
        if (influenceFactor2) trueNum++;
        if (influenceFactor3) trueNum++;
        if (trueNum >= 2) {
          culList[i].riskRate = 3;
        } else if (trueNum >= 1 && trueNum < 2) {
          culList[i].riskRate = 2;
        } else {
          culList[i].riskRate = 1;
        }
      } else {
        culList[i].riskRate = 4;
      }
    }
    return culList;
  },
  6: ({ culList, examYear }) => {
    for (let i = 0; i < culList.length; i++) {
      let currentScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear
      );
      let oldOneScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear - 1
      );
      let oldTwoScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear - 2
      );
      let oldThreeScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear - 3
      );
      if (
        oldOneScoreAndRank.rank &&
        oldTwoScoreAndRank.rank &&
        oldThreeScoreAndRank.rank &&
        currentScoreAndRank.enrollment &&
        oldOneScoreAndRank.enrollment
      ) {
        // 三年数值都有
        let wave1,
          wave2,
          influenceFactor1,
          influenceFactor2,
          influenceFactor3,
          changeEnrollment,
          trueNum = 0;
        wave1 = Math.abs(oldOneScoreAndRank.rank - oldTwoScoreAndRank.rank);
        wave2 = Math.abs(oldTwoScoreAndRank.rank - oldThreeScoreAndRank.rank);
        influenceFactor1 = wave1 + wave2 >= WAVE_THRESHOLD;
        influenceFactor2 =
          oldOneScoreAndRank.rank > oldTwoScoreAndRank.rank &&
          oldTwoScoreAndRank.rank > oldThreeScoreAndRank.rank;
        changeEnrollment =
          oldOneScoreAndRank.enrollment - currentScoreAndRank.enrollment;
        influenceFactor3 =
          changeEnrollment > 0 &&
          changeEnrollment / oldOneScoreAndRank.enrollment > PLAN_THRESHOLD;
        if (influenceFactor1) trueNum++;
        if (influenceFactor2) trueNum++;
        if (influenceFactor3) trueNum++;
        if (trueNum >= 2) {
          culList[i].riskRate = 3;
        } else if (trueNum >= 1 && trueNum < 2) {
          culList[i].riskRate = 2;
        } else {
          culList[i].riskRate = 1;
        }
      } else {
        culList[i].riskRate = 4;
      }
    }
    return culList;
  },
  7: ({ culList, examYear }) => {
    for (let i = 0; i < culList.length; i++) {
      let currentScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear
      );
      let oldOneScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear - 1
      );
      let oldTwoScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear - 2
      );
      let oldThreeScoreAndRank = culList[i].scoreAndRank.find(
        item => item.year === examYear - 3
      );
      if (
        oldOneScoreAndRank.rank &&
        oldTwoScoreAndRank.rank &&
        oldThreeScoreAndRank.rank &&
        currentScoreAndRank.enrollment &&
        oldOneScoreAndRank.enrollment
      ) {
        // 三年数值都有
        let wave1,
          wave2,
          influenceFactor1,
          influenceFactor2,
          influenceFactor3,
          changeEnrollment,
          trueNum = 0;
        wave1 = Math.abs(oldOneScoreAndRank.rank - oldTwoScoreAndRank.rank);
        wave2 = Math.abs(oldTwoScoreAndRank.rank - oldThreeScoreAndRank.rank);
        influenceFactor1 = wave1 + wave2 >= WAVE_THRESHOLD;
        influenceFactor2 =
          oldOneScoreAndRank.rank > oldTwoScoreAndRank.rank &&
          oldTwoScoreAndRank.rank > oldThreeScoreAndRank.rank;
        changeEnrollment =
          oldOneScoreAndRank.enrollment - currentScoreAndRank.enrollment;
        influenceFactor3 =
          changeEnrollment > 0 &&
          changeEnrollment / oldOneScoreAndRank.enrollment > PLAN_THRESHOLD;
        if (influenceFactor1) trueNum++;
        if (influenceFactor2) trueNum++;
        if (influenceFactor3) trueNum++;
        if (trueNum >= 2) {
          culList[i].riskRate = 3;
        } else if (trueNum >= 1 && trueNum < 2) {
          culList[i].riskRate = 2;
        } else {
          culList[i].riskRate = 1;
        }
      } else {
        culList[i].riskRate = 4;
      }
    }
    return culList;
  }
};
