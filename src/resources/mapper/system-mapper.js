export default {
  queryWarningData: `select * from sys_t_warning`,
  queryProvince: `
  select
  *
  from sys_t_province`,
  queryCity: `
  SELECT
  *
  from
  sys_t_city
  where
  provinceCode = ?
  `,
  queryArea: `
  SELECT
  *
  FROM
  sys_t_area
  WHERE
  cityCode = ?
  `,
  querySchoolNature: `
  select
  *
  from sys_t_school_nature`,
  querySchoolProperty: `
  select
  *
  from
  sys_t_school_property`,
  querySchoolType: `
  select
  *
  from
  sys_t_school_type`,
  queryAreaFeature: `
  select
  *
  from
  sys_t_area_feature`,
  queryLots: `
  select
  *
  from
  sys_t_lots
  `,
  selectLotById: `
  SELECT
    *
  FROM
    sys_t_lots
  WHERE
    id = ?
  `,
  queryVoluntaryOption: `
  -- 根据批次id 查对应志愿个数
  select
  a.fk_lot_id as lot_id,
  b.lots_name as lot_name,
  a.fk_five_volunteer_id as five_volunteer_id,
  c.volunteer_name
  from sys_merge_lots_volunteer a
  join
  sys_t_lots b
  on a.fk_lot_id = b.id
  join
  sys_t_five_volunteer c
  on a.fk_five_volunteer_id = c.id
  where a.fk_lot_id = ?;`,
  queryGatherOption: `
  SELECT
  *
  FROM
  sys_t_gather
  `,
  // 查询权限表
  selectRoleByCode: `
  SELECT
  *
  FROM
  sys_t_role
  WHERE
  roleCode = ?
  `,
  // 根据分析出来的id查询单位满意度的具体情况
  selectUnitSatisfaction: `
  SELECT
    *
  FROM
    sys_t_unit_satisfaction
  WHERE
    analysisId = ?
  `,
  queryHighSchoolById: `
			SELECT
			highSchoolName,code
			FROM
			sys_t_high_school
			WHERE
			areaCode = ?
			
	`
};
