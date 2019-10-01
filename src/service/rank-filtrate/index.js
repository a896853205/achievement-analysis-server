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

// 计算线差
export const culLineDifferStrategies = {
  1: (oldOneLotsScore, oldTwoLotsScore, oldThreeLotsScore, score) => {
    let oldOneScore = oldOneLotsScore.filter(item => item.fk_lots_id === 2);
    let oldTwoScore = oldTwoLotsScore.filter(item => item.fk_lots_id === 2);
    let oldThreeScore = oldThreeLotsScore.filter(item => item.fk_lots_id === 2);

    return [
      score - oldOneScore[0].score,
      score - oldTwoScore[0].score,
      score - oldThreeScore[0].score
    ];
  },
  2: (oldOneLotsScore, oldTwoLotsScore, oldThreeLotsScore, score) => {
    let oldOneScore = oldOneLotsScore.filter(item => item.fk_lots_id === 2);
    let oldTwoScore = oldTwoLotsScore.filter(item => item.fk_lots_id === 2);
    let oldThreeScore = oldThreeLotsScore.filter(item => item.fk_lots_id === 2);

    return [
      score - oldOneScore[0].score,
      score - oldTwoScore[0].score,
      score - oldThreeScore[0].score
    ];
  },
  3: (oldOneLotsScore, oldTwoLotsScore, oldThreeLotsScore, score) => {
    let oldOneScore = oldOneLotsScore.filter(item => item.fk_lots_id === 3);
    let oldTwoScore = oldTwoLotsScore.filter(item => item.fk_lots_id === 3);
    let oldThreeScore = oldThreeLotsScore.filter(item => item.fk_lots_id === 3);

    return [
      score - oldOneScore[0].score,
      score - oldTwoScore[0].score,
      score - oldThreeScore[0].score
    ];
  },
  4: (oldOneLotsScore, oldTwoLotsScore, oldThreeLotsScore, score) => {
    let oldOneScore = oldOneLotsScore.filter(item => item.fk_lots_id === 4);
    let oldTwoScore = oldTwoLotsScore.filter(item => item.fk_lots_id === 4);
    let oldThreeScore = oldThreeLotsScore.filter(item => item.fk_lots_id === 4);

    return [
      score - oldOneScore[0].score,
      score - oldTwoScore[0].score,
      score - oldThreeScore[0].score
    ];
  },
  5: (oldOneLotsScore, oldTwoLotsScore, oldThreeLotsScore, score) => {
    let oldOneScore = oldOneLotsScore.filter(item => item.fk_lots_id === 5);
    let oldTwoScore = oldTwoLotsScore.filter(item => item.fk_lots_id === 5);
    let oldThreeScore = oldThreeLotsScore.filter(item => item.fk_lots_id === 5);

    return [
      score - oldOneScore[0].score,
      score - oldTwoScore[0].score,
      score - oldThreeScore[0].score
    ];
  },
  6: (oldOneLotsScore, oldTwoLotsScore, oldThreeLotsScore, score) => {
    let oldOneScore = oldOneLotsScore.filter(item => item.fk_lots_id === 6);
    let oldTwoScore = oldTwoLotsScore.filter(item => item.fk_lots_id === 6);
    let oldThreeScore = oldThreeLotsScore.filter(item => item.fk_lots_id === 6);

    return [
      score - oldOneScore[0].score,
      score - oldTwoScore[0].score,
      score - oldThreeScore[0].score
    ];
  },
  7: (oldOneLotsScore, oldTwoLotsScore, oldThreeLotsScore, score) => {
    let oldOneScore = oldOneLotsScore.filter(item => item.fk_lots_id === 7);
    let oldTwoScore = oldTwoLotsScore.filter(item => item.fk_lots_id === 7);
    let oldThreeScore = oldThreeLotsScore.filter(item => item.fk_lots_id === 7);

    return [
      score - oldOneScore[0].score,
      score - oldTwoScore[0].score,
      score - oldThreeScore[0].score
    ];
  }
};
