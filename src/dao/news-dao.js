import { db, SqlObject } from '../resources/db-connect';

import newsMapper from '../resources/mapper/news-mapper';

export default {
  // 查询新闻通过该新闻的uuid
  selectNewsByuuid: async uuid => {
    return (await db.query(
      new SqlObject(newsMapper.selectNewsByUuid, [uuid])
    ))[0];
  },

  // 看的新闻次数+1
  updatePlusOneNewsViewTimes: async uuid => {
    return (await db.query(
      new SqlObject(newsMapper.updatePlusOneNewsViewTimes, [uuid])
    ))[0];
  },

  queryNewsProfileByType: async (type, count) => {
    return await db.query(
      new SqlObject(newsMapper.queryNewsProfileByType, [type, count])
    );
  }
};
