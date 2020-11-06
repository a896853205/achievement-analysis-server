import { db, SqlObject } from '../resources/db-connect';
import fuzzySearchMapper from '../resources/mapper/fuzzy-search-mapper';
/**
 * 通过major模糊查询major_name
 */
export default {
  getFuzzyMajorList: async (majorName) => {
    return await db.query(
      new SqlObject(fuzzySearchMapper.getFuzzyMajorList, [`%${majorName}%`])
    );
  },
};
