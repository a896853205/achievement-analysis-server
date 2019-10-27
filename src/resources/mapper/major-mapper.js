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
  `,
  selectMajorNameById: `
    SELECT
    
    major_name,major_level_one_code,major_category_code,id
    FROM
    sys_t_major
    WHERE
    major_level_two_code = ?
    LIMIT
    1
  `,

  selectMajorLevelOneName: `
    SELECT
    name
    FROM
    sys_t_major_level_one
    WHERE
    major_level_one_code = ?

  `,
  selectMajorCategoryName: `
    SELECT
    name
    FROM
    sys_t_major_category
    WHERE
    major_category_code = ?
  `,
  selectMajorIntroById: `
    SELECT
    DISTINCT
    major_intro,study_threshold,main_course,postgraduate_intro,graduate_destination
    FROM
      t_major_intro
      WHERE
      fk_major_id = ?
  `,
  selectMajorSystemById: `
    SELECT
    DISTINCT
    education_system
    FROM
    t_major_enrollment_info
    WHERE
    fk_major_id = ?

  `
};
