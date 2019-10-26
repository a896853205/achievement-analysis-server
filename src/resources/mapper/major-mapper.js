export default {
  queryMajorLevelTwo: `
    SELECT
    DISTINCT
		major_level_two_code,major_name,major_level_one_code,major_category_code
		FROM
    sys_t_major
    
  `,
  queryMajorLevelOne: `
    SELECT
    name,major_level_one_code,major_category_code
    FROM
    sys_t_major_level_one
  `,
  queryMajorCategory: `
    SELECT
    major_category_code,name
    FROM
    sys_t_major_category
  `
};
