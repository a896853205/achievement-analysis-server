// 筛选学校性质
export const filtrateNatureSchool = (natureValues, schoolList) => {
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
export const filtratePropertySchool = (propertyValues, schoolList) => {
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
export const filtrateTypeSchool = (typeValues, schoolList) => {
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
export const filtrateAreaFeatureSchool = (areaFeatureValues, schoolList) => {
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
  let score1 = score - scoreRange.down_score_1,
    score2 = score - scoreRange.down_score_2,
    score3 = score - scoreRange.down_score_3,
    score4 = score,
    score5 = score + scoreRange.up_score_4,
    score6 = score + scoreRange.up_score_5,
    schoolListA = [],
    schoolListB = [],
    schoolListC = [],
    schoolListD = [],
    schoolListE = [];

  for (let schoolItem of schoolList) {
    let currentSchool = schoolItem.school_score.find(item => {
      return item.year === oldYear;
    });
    if (currentSchool) {
      if (currentSchool.score >= score1 && currentSchool.score < score2) {
        schoolItem.gather = 'e';
        schoolListE.push(schoolItem);
      } else if (
        currentSchool.score >= score2 &&
        currentSchool.score < score3
      ) {
        schoolItem.gather = 'd';
        schoolListD.push(schoolItem);
      } else if (
        currentSchool.score >= score3 &&
        currentSchool.score < score4
      ) {
        schoolItem.gather = 'c';
        schoolListC.push(schoolItem);
      } else if (
        currentSchool.score >= score4 &&
        currentSchool.score < score5
      ) {
        schoolItem.gather = 'b';
        schoolListB.push(schoolItem);
      } else if (
        currentSchool.score >= score5 &&
        currentSchool.score < score6
      ) {
        schoolItem.gather = 'a';
        schoolListA.push(schoolItem);
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
      return schoolListA.concat(
        schoolListB,
        schoolListC,
        schoolListD,
        schoolListE
      );
  }
};

// 计算提档概率
// 1低 2中 3高 4未知
export const culEnrollRateStrategies = {
  1: ({ stuOldOneScoreAndRank, schoolList, examYear }) => {
    for (let i = 0; i < schoolList.length; i++) {
      let oldOneScoreAndRank = schoolList[i].school_score.find(item => {
        return item.year === examYear - 1;
      });
      let oldTwoScoreAndRank = schoolList[i].school_score.find(item => {
        return item.year === examYear - 2;
      });
      let oldThreeScoreAndRank = schoolList[i].school_score.find(item => {
        return item.year === examYear - 3;
      });

      if (oldOneScoreAndRank && oldTwoScoreAndRank && oldThreeScoreAndRank) {
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
            schoolList[i].school_score.map(o => {
              return o.rank;
            })
          )
        ) {
          schoolList[i].enrollRate = 3;
        } else if (stuOldOneScoreAndRank.rank <= avgRank) {
          schoolList[i].enrollRate = 2;
        } else {
          schoolList[i].enrollRate = 1;
        }
      } else {
        schoolList[i].enrollRate = 4;
      }
    }

    return schoolList;
  },
  2: ({ stuOldOneScoreAndRank, schoolList, examYear }) => {
    for (let i = 0; i < schoolList.length; i++) {
      let oldOneScoreAndRank = schoolList[i].school_score.find(item => {
        return item.year === examYear - 3;
      });
      let oldTwoScoreAndRank = schoolList[i].school_score.find(item => {
        return item.year === examYear - 2;
      });
      let oldThreeScoreAndRank = schoolList[i].school_score.find(item => {
        return item.year === examYear - 1;
      });
      if (oldOneScoreAndRank && oldTwoScoreAndRank && oldThreeScoreAndRank) {
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
            schoolList[i].school_score.map(o => {
              return o.rank;
            })
          )
        ) {
          schoolList[i].enrollRate = 1;
        } else if (stuOldOneScoreAndRank.rank <= avgRank) {
          schoolList[i].enrollRate = 2;
        } else {
          schoolList[i].enrollRate = 3;
        }
      } else {
        schoolList[i].enrollRate = 4;
      }
    }

    return schoolList;
  },
  3: ({ stuOldOneScoreAndRank, schoolList, examYear }) => {
    for (let i = 0; i < schoolList.length; i++) {
      let oldOneScoreAndRank = schoolList[i].school_score.find(item => {
        return item.year === examYear - 3;
      });
      let oldTwoScoreAndRank = schoolList[i].school_score.find(item => {
        return item.year === examYear - 2;
      });
      let oldThreeScoreAndRank = schoolList[i].school_score.find(item => {
        return item.year === examYear - 1;
      });
      if (oldOneScoreAndRank && oldTwoScoreAndRank && oldThreeScoreAndRank) {
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
            schoolList[i].school_score.map(o => {
              return o.rank;
            })
          )
        ) {
          schoolList[i].enrollRate = 1;
        } else if (stuOldOneScoreAndRank.rank <= avgRank) {
          schoolList[i].enrollRate = 2;
        } else {
          schoolList[i].enrollRate = 3;
        }
      } else {
        schoolList[i].enrollRate = 4;
      }
    }

    return schoolList;
  },
  4: ({ schoolList, stuLineDiffer }) => {
    for (let i = 0; i < schoolList.length; i++) {
      let [oldOneDiffer, oldTwoDiffer, oldThreeDiffer] = schoolList[
        i
      ].lineDiffir;
      if (oldOneDiffer && oldTwoDiffer && oldThreeDiffer) {
        let avgDiffer = parseInt(
          (oldOneDiffer + oldTwoDiffer + oldThreeDiffer) / 3
        );

        if (stuLineDiffer >= Math.max.apply(Math, schoolList[i].lineDiffir)) {
          schoolList[i].enrollRate = 3;
        } else if (stuLineDiffer >= avgDiffer) {
          schoolList[i].enrollRate = 2;
        } else {
          schoolList[i].enrollRate = 1;
        }
      } else {
        schoolList[i].enrollRate = 4;
      }
    }

    return schoolList;
  },
  5: ({ schoolList, stuLineDiffer }) => {
    for (let i = 0; i < schoolList.length; i++) {
      let [oldOneDiffer, oldTwoDiffer, oldThreeDiffer] = schoolList[
        i
      ].lineDiffir;
      if (oldOneDiffer && oldTwoDiffer && oldThreeDiffer) {
        let avgDiffer = parseInt(
          (oldOneDiffer + oldTwoDiffer + oldThreeDiffer) / 3
        );
        if (stuLineDiffer >= Math.max.apply(Math, schoolList[i].lineDiffir)) {
          schoolList[i].enrollRate = 3;
        } else if (stuLineDiffer >= avgDiffer) {
          schoolList[i].enrollRate = 2;
        } else {
          schoolList[i].enrollRate = 1;
        }
      } else {
        schoolList[i].enrollRate = 4;
      }
    }

    return schoolList;
  },
  6: ({ schoolList, stuLineDiffer }) => {
    for (let i = 0; i < schoolList.length; i++) {
      let [oldOneDiffer, oldTwoDiffer, oldThreeDiffer] = schoolList[
        i
      ].lineDiffir;
      if (oldOneDiffer && oldTwoDiffer && oldThreeDiffer) {
        let avgDiffer = parseInt(
          (oldOneDiffer + oldTwoDiffer + oldThreeDiffer) / 3
        );
        if (stuLineDiffer >= Math.max.apply(Math, schoolList[i].lineDiffir)) {
          schoolList[i].enrollRate = 3;
        } else if (stuLineDiffer >= avgDiffer) {
          schoolList[i].enrollRate = 2;
        } else {
          schoolList[i].enrollRate = 1;
        }
      } else {
        schoolList[i].enrollRate = 4;
      }
    }

    return schoolList;
  },
  7: ({ schoolList, stuLineDiffer }) => {
    for (let i = 0; i < schoolList.length; i++) {
      let [oldOneDiffer, oldTwoDiffer, oldThreeDiffer] = schoolList[
        i
      ].lineDiffir;
      if (oldOneDiffer && oldTwoDiffer && oldThreeDiffer) {
        let avgDiffer = parseInt(
          (oldOneDiffer + oldTwoDiffer + oldThreeDiffer) / 3
        );

        if (stuLineDiffer >= Math.max.apply(Math, schoolList[i].lineDiffir)) {
          schoolList[i].enrollRate = 3;
        } else if (stuLineDiffer >= avgDiffer) {
          schoolList[i].enrollRate = 2;
        } else {
          schoolList[i].enrollRate = 1;
        }
      } else {
        schoolList[i].enrollRate = 4;
      }
    }

    return schoolList;
  }
};
