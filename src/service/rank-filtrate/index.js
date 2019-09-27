// 分析当前年的分数获取当前年的位次,去年的分数和去年位次
export const parseCurrentScore = (score, currentRank, oldRank) => {
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
export const proxyParseToOldScore = (score, currentRank, oldRank) => {
  let { fitOld } = parseCurrentScore(score, currentRank, oldRank);
  return fitOld.score;
};

export const computeLotsScoreDifferMsg = (score, lotsScoreList) => {
  let lotsScoreDifferMsg = '';

  let lotsScoreObj = lotsScoreList.find(item => {
    return score >= item.score;
  });

  if (lotsScoreObj.fk_lots_id > 5) {
    // 分数小于2批b
    lotsScoreDifferMsg = lotsStrategy[5](score, lotsScoreObj);
  } else {
    // 分数大于2批b
    lotsScoreDifferMsg = lotsStrategy[lotsScoreObj.fk_lots_id](score, lotsScoreObj);
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
			return `高出一本A线${differ}分`;
    } else {
			return `与一本A线分数恰好相同`;
    }
	},
	
  // 一批B
  3: (score, lotsScoreObj) => {
		let differ = score - lotsScoreObj.score;
    if (differ) {
			return `高出一本B线${differ}分`;
    } else {
			return `与一本B线分数恰好相同`;
    }
	},
  
  // 二批A
  4: (score, lotsScoreObj) => {
		let differ = score - lotsScoreObj.score;
    if (differ) {
			return `高出二本A线${differ}分`;
    } else {
			return `与二本A线分数恰好相同`;
    }
	},
  // 二批B
  5: (score, lotsScoreObj) => {
		let differ = score - lotsScoreObj.score;
    if (differ > 0) {
			return `高出二本B线${differ}分`;
    } else if (!differ) {
			return `与二本A线分数恰好相同`;
    } else if (differ < 0) {
			return `低于二本B线${-differ}分`;
		}
	}
};
