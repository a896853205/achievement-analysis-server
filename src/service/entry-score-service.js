// dao
import entryScoreDao from '../dao/entry-score-dao';

export default {
  // 通过用户uuid获取录取批次线
  getEntryScore: async user => {
    let result = await entryScoreDao.queryByUserUuid(user.uuid);

    let personalEntryScore = result.filter(entryScoreItem => {
      return user.score > entryScoreItem.score;
    })
    return personalEntryScore;
  }
}