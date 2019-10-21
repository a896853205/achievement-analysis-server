import { db, SqlObject } from '../resources/db-connect';

import newsMapper from '../resources/mapper/news-mapper';
import { PAGE_NEWS } from '../constants/api-constants';
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
  },

  queryHotNewsProfile: async () => {
    return await db.query(new SqlObject(newsMapper.queryHotNewsProfile));
  },

  queryAllNewsNumByType: async type => {
    return (await db.query(
      new SqlObject(newsMapper.queryAllNewsNumByType, [type])
    ))[0];
  },

  queryMoreNews: async (page, type) => {
    page = (page - 1) * PAGE_NEWS;

    return await db.query(
      new SqlObject(newsMapper.queryMoreNews, [type, page])
    );
  }
};
