export default {
    getFuzzyMajorList: `
      SELECT 
      uuid, majorName
      FROM 
      sys_t_fuzzy_major
      WHERE
      majorName LIKE ?
      LIMIT 
      10
  `,
}