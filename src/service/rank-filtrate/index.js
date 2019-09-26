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
}