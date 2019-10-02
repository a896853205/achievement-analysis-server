// 分析当前年的分数获取当前年的位次,去年的分数和去年位次
export const parseCurrentScore = (score, currentRank = [], oldRank = []) => {
  currentRank.sort((one, two) => {
    return two.score - one.score;
  });

  oldRank.sort((one, two) => {
    return two.rank - one.rank;
  });

  let fitCurrent = null,
    fitOld = null;

  for (let currentItem of currentRank) {
    if (score >= currentItem.score) {
      fitCurrent = currentItem;
      break;
    }
  }

  for (let oldItem of oldRank) {
    if (oldItem.rank >= fitCurrent.rank) {
      fitOld = oldItem;
    }
  }

  return {
    fitCurrent,
    fitOld
  };
};

// 将新的分数转换为旧的分数
export const proxyParseToOldScore = (
  score,
  currentRank,
  oldRank,
  oldTwoRank,
  oldThreeRank
) => {
  let result = [];

  result.push(parseCurrentScore(score, currentRank, oldRank).fitOld);
  result.push(parseCurrentScore(score, currentRank, oldTwoRank).fitOld);
  result.push(parseCurrentScore(score, currentRank, oldThreeRank).fitOld);

  return result;
};

export const computeLotsScoreDifferMsg = (score, lotsScoreList) => {
  let lotsScoreDifferMsg = '';

  let lotsScoreObj = lotsScoreList.find(item => {
    return score >= item.score;
  });

  if (!lotsScoreObj || lotsScoreObj.fk_lots_id > 5) {
    // 分数小于二本线
    lotsScoreObj = lotsScoreList.find(item => {
      return item.fk_lots_id === 5;
    });
    lotsScoreDifferMsg = lotsStrategy[5](score, lotsScoreObj);
  } else {
    // 分数大于二本线
    lotsScoreDifferMsg = lotsStrategy[lotsScoreObj.fk_lots_id](
      score,
      lotsScoreObj
    );
  }

  return lotsScoreDifferMsg;
};

let lotsStrategy = {
  // 提前批
  1: (score, lotsScoreObj) => {
    let differ = score - lotsScoreObj.score;
    if (differ) {
      return `高出提前批线${differ}分`;
    } else {
      return `与提前批线分数恰好相同`;
    }
  },

  // 一批A
  2: (score, lotsScoreObj) => {
    let differ = score - lotsScoreObj.score;
    if (differ) {
      return `高出一本线${differ}分`;
    } else {
      return `与一本线分数恰好相同`;
    }
  },

  // 一批B
  3: (score, lotsScoreObj) => {
    let differ = score - lotsScoreObj.score;
    if (differ) {
      return `高出一本线${differ}分`;
    } else {
      return `与一本线分数恰好相同`;
    }
  },

  // 二批A
  4: (score, lotsScoreObj) => {
    let differ = score - lotsScoreObj.score;
    if (differ) {
      return `高出二本线${differ}分`;
    } else {
      return `与二本线分数恰好相同`;
    }
  },
  // 二批B
  5: (score, lotsScoreObj) => {
    let differ = score - lotsScoreObj.score;
    if (differ > 0) {
      return `高出二本线${differ}分`;
    } else if (!differ) {
      return `与二本线分数恰好相同`;
    } else if (differ < 0) {
      return `低于二本线${-differ}分`;
    }
  }
};

// 计算三年的线差
export const culThreeYearLineDiffer = ({
  oldOneLotsScore,
  oldTwoLotsScore,
  oldThreeLotsScore,
  score,
  lotId
}) => [
  culLineDifferStrategies[lotId](score, oldOneLotsScore),
  culLineDifferStrategies[lotId](score, oldTwoLotsScore),
  culLineDifferStrategies[lotId](score, oldThreeLotsScore)
];

// 学校添加近三年的分数和位次和线差
export const bindScoreAndRank = ({
  resultSchoolList,
  lotId,
  examYear,
  // 计算三年分数和位次
  currentRank,
  oldRank,
  oldTwoRank,
  oldThreeRank,
  // 计算三年线差
  oldOneLotsScore,
  oldTwoLotsScore,
  oldThreeLotsScore
}) => {
  for (let i = 0; i < resultSchoolList.length; i++) {
    for (let j = 0; j < resultSchoolList[i].school_score.length; j++) {
      // 判断是哪年,计算出当年的成绩换算成位次
      if (resultSchoolList[i].school_score[j].year === examYear) {
        resultSchoolList[i].school_score[j].rank = parseCurrentScore(
          resultSchoolList[i].school_score[j].score,
          currentRank
        ).fitCurrent.rank;
      } else if (resultSchoolList[i].school_score[j].year === examYear - 1) {
        resultSchoolList[i].school_score[j].rank = parseCurrentScore(
          resultSchoolList[i].school_score[j].score,
          oldRank
        ).fitCurrent.rank;
      } else if (resultSchoolList[i].school_score[j].year === examYear - 2) {
        resultSchoolList[i].school_score[j].rank = parseCurrentScore(
          resultSchoolList[i].school_score[j].score,
          oldTwoRank
        ).fitCurrent.rank;
      } else if (resultSchoolList[i].school_score[j].year === examYear - 3) {
        resultSchoolList[i].school_score[j].rank = parseCurrentScore(
          resultSchoolList[i].school_score[j].score,
          oldThreeRank
        ).fitCurrent.rank;
      }
      // 添加近三年的线差
      resultSchoolList[i].lineDiffir = culThreeYearLineDiffer({
        oldOneLotsScore,
        oldTwoLotsScore,
        oldThreeLotsScore,
        score: resultSchoolList[i].school_score[j].score,
        lotId
      });
    }
  }

  return resultSchoolList;
};

// 计算线差
export const culLineDifferStrategies = {
  1: (score, lotsScore) => {
    return score - lotsScore.filter(item => item.fk_lots_id === 2)[0].score;
  },
  2: (score, lotsScore) => {
    return score - lotsScore.filter(item => item.fk_lots_id === 2)[0].score;
  },
  3: (score, lotsScore) => {
    return score - lotsScore.filter(item => item.fk_lots_id === 3)[0].score;
  },
  4: (score, lotsScore) => {
    return score - lotsScore.filter(item => item.fk_lots_id === 4)[0].score;
  },
  5: (score, lotsScore) => {
    return score - lotsScore.filter(item => item.fk_lots_id === 5)[0].score;
  },
  6: (score, lotsScore) => {
    return score - lotsScore.filter(item => item.fk_lots_id === 6)[0].score;
  },
  7: (score, lotsScore) => {
    return score - lotsScore.filter(item => item.fk_lots_id === 7)[0].score;
  }
};
