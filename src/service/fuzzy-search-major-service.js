import fuzzySearchDao from '../dao/fuzzy-search-major-dao';

/**
 * 根据major模糊查询专业名称major_name
 */
export default {
  getFuzzySearchMajor: async (majorName) => {
    return await fuzzySearchDao.getFuzzyMajorList(majorName);
  },
};
