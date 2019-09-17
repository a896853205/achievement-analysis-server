export default {
	queryProvince: `
  select
  *
  from sys_t_province`,
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
  where a.fk_lot_id = ?;`
};
