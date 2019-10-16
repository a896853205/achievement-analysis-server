import { db, SqlObject } from '../resources/db-connect';

import newsMapper from '../resources/mapper/news-mapper';

export default {
  selectNewsByuuid: async uuid => {
    return (await db.query(
      new SqlObject(newsMapper.selectNewsByUuid, [uuid])
    ))[0];
  }
};
