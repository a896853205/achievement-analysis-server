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
    // FIXME 这里有问题
    if (oldItem.rank >= fitCurrent.rank) {
      fitOld = oldItem;
    }
  }

  // 边界没有的情况
  if (!fitOld) {
    fitOld = oldRank[0];
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

  if (!lotsScoreObj) {
    // 如果不存在就比专科线还低
    lotsScoreDifferMsg = '比专科线低';
  } else {
    // 如果存在调用对应的批次
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
    } else {
      return `与二本线分数恰好相同`;
    }
  },
  // 三本
  6: (score, lotsScoreObj) => {
    let differ = score - lotsScoreObj.score;
    if (differ > 0) {
      return `高出三本线${differ}分`;
    } else {
      return `与三本线分数恰好相同`;
    }
  },
  // 专科
  7: (score, lotsScoreObj) => {
    let differ = score - lotsScoreObj.score;
    if (differ > 0) {
      return `高出专科线${differ}分`;
    } else {
      return `与专科线分数恰好相同`;
    }
  },
};

// 计算三年的线差
export const culThreeYearLineDiffer = ({
  oldOneLotsScore,
  oldTwoLotsScore,
  oldThreeLotsScore,
  scoreAndRank,
  lotId,
  examYear
}) => {
  let resultThreeYearLineDiffer = [];
  let oldOneScoreAndRank = scoreAndRank.find(
    item => item.year === examYear - 1
  );
  let oldTwoScoreAndRank = scoreAndRank.find(
    item => item.year === examYear - 2
  );
  let oldThreeScoreAndRank = scoreAndRank.find(
    item => item.year === examYear - 3
  );

  if (oldOneScoreAndRank && oldOneScoreAndRank.score) {
    resultThreeYearLineDiffer.push(
      culLineDifferStrategies[lotId](oldOneScoreAndRank.score, oldOneLotsScore)
    );
  } else {
    resultThreeYearLineDiffer.push(undefined);
  }

  if (oldTwoScoreAndRank && oldTwoScoreAndRank.score) {
    resultThreeYearLineDiffer.push(
      culLineDifferStrategies[lotId](oldTwoScoreAndRank.score, oldTwoLotsScore)
    );
  } else {
    resultThreeYearLineDiffer.push(undefined);
  }

  if (oldThreeScoreAndRank && oldThreeScoreAndRank.score) {
    resultThreeYearLineDiffer.push(
      culLineDifferStrategies[lotId](
        oldThreeScoreAndRank.score,
        oldThreeLotsScore
      )
    );
  } else {
    resultThreeYearLineDiffer.push(undefined);
  }

  return resultThreeYearLineDiffer;
};

// 学校添加近三年的分数和位次和线差
export const bindScoreAndRank = ({
  resultList,
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
  for (let i = 0; i < resultList.length; i++) {
    for (let j = 0; j < resultList[i].scoreAndRank.length; j++) {
      // 判断是哪年,计算出当年的成绩换算成位次
      if (resultList[i].scoreAndRank[j].year === examYear) {
        if (resultList[i].scoreAndRank[j].score) {
          resultList[i].scoreAndRank[j].rank = parseCurrentScore(
            resultList[i].scoreAndRank[j].score,
            currentRank
          ).fitCurrent.rank;
        } else {
          resultList[i].scoreAndRank[j].rank = undefined;
        }
      } else if (resultList[i].scoreAndRank[j].year === examYear - 1) {
        if (resultList[i].scoreAndRank[j].score) {
          resultList[i].scoreAndRank[j].rank = parseCurrentScore(
            resultList[i].scoreAndRank[j].score,
            oldRank
          ).fitCurrent.rank;
        } else {
          resultList[i].scoreAndRank[j].rank = undefined;
        }
      } else if (resultList[i].scoreAndRank[j].year === examYear - 2) {
        if (resultList[i].scoreAndRank[j].score) {
          resultList[i].scoreAndRank[j].rank = parseCurrentScore(
            resultList[i].scoreAndRank[j].score,
            oldTwoRank
          ).fitCurrent.rank;
        } else {
          resultList[i].scoreAndRank[j].rank = undefined;
        }
      } else if (resultList[i].scoreAndRank[j].year === examYear - 3) {
        if (resultList[i].scoreAndRank[j].score) {
          resultList[i].scoreAndRank[j].rank = parseCurrentScore(
            resultList[i].scoreAndRank[j].score,
            oldThreeRank
          ).fitCurrent.rank;
        } else {
          resultList[i].scoreAndRank[j].rank = undefined;
        }
      }
    }

    // 添加近三年的线差
    resultList[i].lineDiffir = culThreeYearLineDiffer({
      oldOneLotsScore,
      oldTwoLotsScore,
      oldThreeLotsScore,
      scoreAndRank: resultList[i].scoreAndRank,
      lotId,
      examYear
    });
  }

  return resultList;
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

export const calScoreTransformRank = (score, currentRank = []) => {
  let fitCurrent = null;

  currentRank.sort((one, two) => {
    return two.score - one.score;
  });

  for (let currentItem of currentRank) {
    if (score >= currentItem.score) {
      fitCurrent = currentItem;
      break;
    }
  }
  
  return fitCurrent;
};
