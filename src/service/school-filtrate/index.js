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

  // 最下限
  let score1 = score - scoreRange.down_score_1,
    score3 = score - scoreRange.down_score_3,
    score4 = score + scoreRange.up_score_3;
  (score5 = score + scoreRange.up_score_4),
    (score6 = score + scoreRange.up_score_5),
    (schoolListA = []),
    (schoolListB = []),
    (schoolListC = []),
    (schoolListD = []),
    (schoolListE = []);

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
      } else if (
        currentSchool.score >= score3 &&
        currentSchool.score < score4
      ) {
        schoolItem.gather = 'c';
        schoolListC.push(schoolItem);
        continue;
      } else {
        // 不是abc集合需要判断其专业的分数情况
        let majorArr = schoolItem.major;

        // 筛选年份
        majorArr = majorArr.filter(item => {
          return item.year === oldYear;
        });

        // 排除掉分数为空的专业
        majorArr = majorArr.filter(item => {
          return item.major_score;
        });

        // 分数降序排列
        majorArr.sort((prep, next) => {
          return next.major_score - prep.major_score;
        });

        // 如果没有专业分的学校则是d集合
        if (!majorArr.length) {
          schoolItem.gather = 'd';
          schoolListD.push(schoolItem);
          continue;
        }

        // 判断分数是否比专业最高的高,如果高则是e集合
        if (score > majorArr[0].major_score) {
          schoolItem.gather = 'e';
          schoolListE.push(schoolItem);
          continue;
        }

        // 其他的都是d集合
        schoolItem.gather = 'd';
        schoolListD.push(schoolItem);
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

      if (!oldOneScoreAndRank || !oldTwoScoreAndRank || !oldThreeScoreAndRank) {
        culList[i].enrollRate = 4;
      } else if (
        !Number.isInteger(oldOneScoreAndRank.rank) ||
        !Number.isInteger(oldTwoScoreAndRank.rank) ||
        !Number.isInteger(oldThreeScoreAndRank.rank)
      ) {
        // 如果全没有就是未知
        if (
          !Number.isInteger(oldOneScoreAndRank.rank) &&
          !Number.isInteger(oldTwoScoreAndRank.rank) &&
          !Number.isInteger(oldThreeScoreAndRank.rank)
        ) {
          culList[i].enrollRate = 4;
        } else {
          // 如果有两个有且大于最大值
          // 位次小于两年最小值提档概率中
          // 其他情况为低
          let minRank = Infinity;
          let haveNum = 0;
          if (Number.isInteger(oldOneScoreAndRank.rank)) {
            minRank = Math.min(minRank, oldOneScoreAndRank.rank);
            haveNum++;
          }

          if (Number.isInteger(oldTwoScoreAndRank.rank)) {
            minRank = Math.min(minRank, oldTwoScoreAndRank.rank);
            haveNum++;
          }

          if (Number.isInteger(oldThreeScoreAndRank.rank)) {
            minRank = Math.min(minRank, oldThreeScoreAndRank.rank);
            haveNum++;
          }

          if (stuOldOneScoreAndRank.rank <= minRank && haveNum === 2) {
            culList[i].enrollRate = 2;
          } else {
            culList[i].enrollRate = 1;
          }
        }
        // 看看是不是比最小的小
      } else {
        // 如果三年数据都存在,位次小于最小值提档概率高,
        // 位次小于平均值提档概率中,
        // 其他情况为低
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
      }
    }

    return culList;
  },
  2: ({ stuOldOneScoreAndRank, culList, examYear }) => {
    return culEnrollRateStrategies[1]({
      stuOldOneScoreAndRank,
      culList,
      examYear
    });
  },
  3: ({ stuOldOneScoreAndRank, culList, examYear }) => {
    return culEnrollRateStrategies[1]({
      stuOldOneScoreAndRank,
      culList,
      examYear
    });
  },
  4: ({ culList, stuLineDiffer }) => {
    for (let i = 0; i < culList.length; i++) {
      let [oldOneDiffer, oldTwoDiffer, oldThreeDiffer] = culList[i].lineDiffir;

      if (
        !Number.isInteger(oldOneDiffer) ||
        !Number.isInteger(oldTwoDiffer) ||
        !Number.isInteger(oldThreeDiffer)
      ) {
        // 如果全没有就是未知
        if (
          !Number.isInteger(oldOneDiffer) &&
          !Number.isInteger(oldTwoDiffer) &&
          !Number.isInteger(oldThreeDiffer)
        ) {
          culList[i].enrollRate = 4;
        } else {
          // 如果有两个
          // 大于最大值为中
          // 其他情况为低
          let maxDiffir = 0;
          let haveNum = 0;
          if (Number.isInteger(oldOneDiffer)) {
            maxDiffir = Math.max(maxDiffir, oldOneDiffer);
            haveNum++;
          }

          if (Number.isInteger(oldTwoDiffer)) {
            maxDiffir = Math.max(maxDiffir, oldTwoDiffer);
            haveNum++;
          }

          if (Number.isInteger(oldThreeDiffer)) {
            maxDiffir = Math.max(maxDiffir, oldThreeDiffer);
            haveNum++;
          }

          if (stuLineDiffer >= maxDiffir && haveNum === 2) {
            culList[i].enrollRate = 2;
          } else {
            culList[i].enrollRate = 1;
          }
        }
      } else {
        // 如果全部有就是取最大值和平均值进行比较
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
      }
    }
    return culList;
  },
  5: ({ culList, stuLineDiffer }) => {
    return culEnrollRateStrategies[4]({ culList, stuLineDiffer });
  },
  6: ({ culList, stuLineDiffer }) => {
    return culEnrollRateStrategies[4]({ culList, stuLineDiffer });
  },
  7: ({ culList, stuLineDiffer }) => {
    return culEnrollRateStrategies[4]({ culList, stuLineDiffer });
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
      let [oldOneDiffer, oldTwoDiffer, oldThreeDiffer] = culList[i].lineDiffir;

      if (
        currentScoreAndRank &&
        oldOneScoreAndRank &&
        Number.isInteger(oldOneDiffer) &&
        Number.isInteger(oldTwoDiffer) &&
        Number.isInteger(oldThreeDiffer) &&
        Number.isInteger(currentScoreAndRank.enrollment) &&
        Number.isInteger(oldOneScoreAndRank.enrollment)
      ) {
        // 三年数值都有
        let wave1,
          wave2,
          influenceFactor1,
          influenceFactor2,
          influenceFactor3,
          changeEnrollment,
          trueNum = 0;
        wave1 = Math.abs(oldOneDiffer - oldTwoDiffer);
        wave2 = Math.abs(oldThreeDiffer - oldTwoDiffer);
        influenceFactor1 = wave1 + wave2 >= WAVE_THRESHOLD;
        influenceFactor2 =
          oldOneDiffer > oldTwoDiffer && oldTwoDiffer > oldThreeDiffer;
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
      } else if (
        !Number.isInteger(oldOneDiffer) &&
        !Number.isInteger(oldTwoDiffer) &&
        !Number.isInteger(oldThreeDiffer)
      ) {
        // 如果都没有返回未知
        culList[i].riskRate = 4;
      } else {
        // 如有一到两个
        let influenceFactor3;

        if (
          Number.isInteger(oldOneScoreAndRank.enrollment) &&
          Number.isInteger(currentScoreAndRank.enrollment)
        ) {
          let changeEnrollment =
            oldOneScoreAndRank.enrollment - currentScoreAndRank.enrollment;
          influenceFactor3 =
            changeEnrollment > 0 &&
            changeEnrollment / oldOneScoreAndRank.enrollment > PLAN_THRESHOLD;
        }

        // 如果招生人数变化大直接就是中
        if (influenceFactor3) {
          culList[i].riskRate = 2;
        } else {
          if (
            Number.isInteger(oldOneDiffer) &&
            Number.isInteger(oldTwoDiffer)
          ) {
            // 最近两年有
            if (Math.abs(oldOneDiffer - oldTwoDiffer) >= WAVE_THRESHOLD / 2) {
              culList[i].riskRate = 2;
            } else {
              culList[i].riskRate = 1;
            }
          } else if (
            Number.isInteger(oldThreeDiffer) &&
            Number.isInteger(oldOneDiffer)
          ) {
            // 最近一年和远的一年有
            if (Math.abs(oldThreeDiffer - oldOneDiffer) >= WAVE_THRESHOLD / 2) {
              culList[i].riskRate = 2;
            } else {
              culList[i].riskRate = 1;
            }
          } else if (
            Number.isInteger(oldThreeDiffer) &&
            Number.isInteger(oldTwoDiffer)
          ) {
            // 最远两年有
            if (Math.abs(oldThreeDiffer - oldTwoDiffer) >= WAVE_THRESHOLD / 2) {
              culList[i].riskRate = 2;
            } else {
              culList[i].riskRate = 1;
            }
          } else {
            // 只有一年有
            culList[i].riskRate = 3;
          }
        }
      }
    }

    return culList;
  },
  2: ({ culList, examYear }) => {
    return culRiskRateStrategies[1]({ culList, examYear });
  },
  3: ({ culList, examYear }) => {
    return culRiskRateStrategies[1]({ culList, examYear });
  },
  4: ({ culList, examYear }) => {
    return culRiskRateStrategies[1]({ culList, examYear });
  },
  5: ({ culList, examYear }) => {
    return culRiskRateStrategies[1]({ culList, examYear });
  },
  6: ({ culList, examYear }) => {
    return culRiskRateStrategies[1]({ culList, examYear });
  },
  7: ({ culList, examYear }) => {
    return culRiskRateStrategies[1]({ culList, examYear });
  }
};
