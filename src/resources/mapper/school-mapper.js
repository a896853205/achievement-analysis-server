export default {
	// 通过批次查询对应学校
	querySchoolByLotId: `
  select 
a.id as lot_id,
a.lot_name,
b.school_id,
b.school_code,
b.school_name,
b.fk_province_id as province_id,
b.province_name,
b.fk_city_id as city_id,
b.city_name,
b.fk_nature_id as nature_id,
b.school_nature,
b.school_property_id,
b.school_property,
c.school_type_id,
c.school_type
from 
sys_t_lots a
join
(
	select 
	a.id as school_id,
	a.school_code,
	a.school_name,
	a.fk_lot_id,
	a.fk_province_id,
	a.fk_city_id,
	b.province_name,
	c.city_name,
	a.fk_nature_id,
	d.type as school_nature,
	e.school_property_id,
	e.school_property
	from 
	t_school a
	left join
	sys_t_province b
	on a.fk_province_id = b.id
	left join 
	sys_t_city c
	on a.fk_city_id = c.id
	left join
	sys_t_school_nature d
	on a.fk_nature_id = d.id
	left join
	(
		select
		a.id,
		a.school_name,
		a.school_code,
		c.type as school_property,
		c.id as school_property_id
		from t_school a
		left join
		merge_school_school_property b
		on a.id = b.fk_school_id
		left join
		sys_t_school_property c
		on b.fk_school_property_id = c.id
	) as e
	on a.id = e.id
) as b
on a.id = b.fk_lot_id 
left join
(
	select 
	a.id as school_id,
	c.id as school_type_id,
	c.type as school_type
	from
	t_school a
	left join
	merge_school_school_type b
	on a.id = b.fk_school_id
	left join
	sys_t_school_type c
	on b.fk_school_type_id = c.id
) as c
on b.school_id = c.school_id
where a.id = ?;
  `
};
