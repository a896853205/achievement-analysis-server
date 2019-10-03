export default {
  // 通过批次查询对应学校
  querySchool: `
	select 
		a.id as school_id,
		a.code as school_code,
		a.name as school_name,
		a.fk_province_id as province_id,
		b.province_name,
		a.fk_nature_id as school_nature_id,
		c.type as school_nature_name,
		d.area_feature_id,
		d.area_feature_name,
		e.school_property_id,
		e.school_property_name,
		f.school_type_id,
		f.school_type_name
	from t_school a
	left join
	sys_t_province b
	on a.fk_province_id = b.id
	left join
	sys_t_school_nature c
	on a.fk_nature_id = c.id
	left join
	(
		select 
		a.fk_school_id as school_id,
		b.id as area_feature_id,
		b.type as area_feature_name
		from 
		merge_school_area_feature a
		left join
		sys_t_area_feature b
		on a.fk_area_feature_id = b.id
	) as d
	on a.id = d.school_id
	left join
	(
		select 
		a.fk_school_id as school_id,
		b.id as school_property_id,
		b.type as school_property_name
		from merge_school_school_property a
		left join
		sys_t_school_property b
		on a.fk_school_property_id = b.id
	) as e
	on a.id = e.school_id
	left join
	(
		select
		a.fk_school_id as school_id,
		a.fk_school_type_id as school_type_id,
		b.type as school_type_name
		from merge_school_school_type a
		left join
		sys_t_school_type b
		on a.fk_school_type_id = b.id
	) as f
	on a.id = f.school_id
	WHERE
	a.name LIKE ?`,
  querySchoolByLotIdAndAccountCategory: `
	-- 根据批次id 查学校
	select 
	a.fk_lots_id as lot_id,
	a.score,
	a.year,
	a.gender,
	a.poverty,
	a.enrollment,
	b.lots_name as lot_name,
	c.*
	from 
	merge_school_lots a
	left join
	sys_t_lots b
	on a.fk_lots_id =b.id
	left join
	(
		select 
		a.id as school_id,
		a.code as school_code,
		a.name as school_name,
		a.fk_province_id as province_id,
		b.province_name,
		a.fk_nature_id as school_nature_id,
		c.type as school_nature_name,
		d.area_feature_id,
		d.area_feature_name,
		e.school_property_id,
		e.school_property_name,
		f.school_type_id,
		f.school_type_name
		from t_school a
		left join
		sys_t_province b
		on a.fk_province_id = b.id
		left join
		sys_t_school_nature c
		on a.fk_nature_id = c.id
		left join
		(
			select 
			a.fk_school_id as school_id,
			b.id as area_feature_id,
			b.type as area_feature_name
			from 
			merge_school_area_feature a
			left join
			sys_t_area_feature b
			on a.fk_area_feature_id = b.id
		) as d
		on a.id = d.school_id
		left join
		(
			select 
			a.fk_school_id as school_id,
			b.id as school_property_id,
			b.type as school_property_name
			from merge_school_school_property a
			left join
			sys_t_school_property b
			on a.fk_school_property_id = b.id
		) as e
		on a.id = e.school_id
		left join
		(
			select
			a.fk_school_id as school_id,
			a.fk_school_type_id as school_type_id,
			b.type as school_type_name
			from merge_school_school_type a
			left join
			sys_t_school_type b
			on a.fk_school_type_id = b.id
		) as f
		on a.id = f.school_id
	) as c
	on a.fk_school_id = c.school_id
	where 
	a.fk_lots_id = ?
	AND
	a.accountCategory = ?;
`,
  querySchoolByLotIdAndNameAndAccountCategory: `
select 
a.fk_lots_id as lot_id,
a.score,
a.year,
a.gender,
a.poverty,
a.enrollment,
b.lots_name as lot_name,
c.*
from 
merge_school_lots a
left join
sys_t_lots b
on a.fk_lots_id =b.id
left join
(
	select 
	a.id as school_id,
	a.code as school_code,
	a.name as school_name,
	a.fk_province_id as province_id,
	b.province_name,
	a.fk_nature_id as school_nature_id,
	c.type as school_nature_name,
	d.area_feature_id,
	d.area_feature_name,
	e.school_property_id,
	e.school_property_name,
	f.school_type_id,
	f.school_type_name
	from t_school a
	left join
	sys_t_province b
	on a.fk_province_id = b.id
	left join
	sys_t_school_nature c
	on a.fk_nature_id = c.id
	left join
	(
		select 
		a.fk_school_id as school_id,
		b.id as area_feature_id,
		b.type as area_feature_name
		from 
		merge_school_area_feature a
		left join
		sys_t_area_feature b
		on a.fk_area_feature_id = b.id
	) as d
	on a.id = d.school_id
	left join
	(
		select 
		a.fk_school_id as school_id,
		b.id as school_property_id,
		b.type as school_property_name
		from merge_school_school_property a
		left join
		sys_t_school_property b
		on a.fk_school_property_id = b.id
	) as e
	on a.id = e.school_id
	left join
	(
		select
		a.fk_school_id as school_id,
		a.fk_school_type_id as school_type_id,
		b.type as school_type_name
		from merge_school_school_type a
		left join
		sys_t_school_type b
		on a.fk_school_type_id = b.id
	) as f
	on a.id = f.school_id
) as c
on a.fk_school_id = c.school_id
where
a.fk_lots_id = ?
AND
school_name LIKE ?
AND
a.accountCategory = ?;
`,
	getMajorBySchoolId: `
	-- 批次id和学校id和年 查询专业
	SELECT
		a.id as enrollment_id,
		a.fk_school_id as school_id,
		c.*,
		a.tuition,
		a.education_system,
		a.enrollment,
		a.enrollment_score AS score,
		a.year,
		a.fk_lot_id as lot_id,
		b.lots_name as lot_name
	FROM
		t_major_enrollment_info a
	LEFT JOIN
		sys_t_lots b
	ON a.fk_lot_id = b.id
	LEFT JOIN
	(
		select 
		a.id as major_id,
		a.major_name,
		a.major_code,
		a.comment,
		a.fk_major_category_id as major_category_id
		from
		sys_t_major a
	) as c
	on a.fk_major_id = c.major_id
	where a.fk_school_id =? and a.fk_lot_id =?;
	`,
	// 带有major_category_id表
	// `
	// -- 批次id和学校id和年 查询专业
	// select
	// a.fk_school_id as school_id,
	// c.*,
	// a.tuition,
	// a.education_system,
	// a.enrollment,
	// a.enrollment_score,
	// a.year,
	// a.fk_lot_id as lot_id,
	// b.lots_name as lot_name
	// from 
	// t_major_enrollment_info a
	// left join
	// sys_t_lots b
	// on a.fk_lot_id = b.id
	// left join
	// (
	// 	select 
	// 	a.id as major_id,
	// 	a.major_name,
	// 	a.major_code,
	// 	a.fk_major_category_id as major_category_id,
	// 	b.major_category as major_category_name,
	// 	b.major_category_code
	// 	from
	// 	sys_t_major a
	// 	join
	// 	sys_t_major_category b
	// 	on a.fk_major_category_id = b.id
	// ) as c
	// on a.fk_major_id = c.major_id
	// where a.fk_school_id =? and a.fk_lot_id =? and a.year =?;
	// `,
  querySchoolWithMajorByLotIdAndAccountCategory: `
	select 
	a.fk_lots_id as lot_id,
	a.score,
	a.year,
	a.gender,
	a.poverty,
	a.enrollment,
	b.lots_name as lot_name,
	c.*,
	sys_t_major.id as major_id,
	sys_t_major.major_name as major_name
	from 
	merge_school_lots a
	left join
	sys_t_lots b
	on a.fk_lots_id =b.id
	left join
	(
		select 
		a.id as school_id,
		a.code as school_code,
		a.name as school_name,
		a.fk_province_id as province_id,
		b.province_name,
		a.fk_nature_id as school_nature_id,
		c.type as school_nature_name,
		d.area_feature_id,
		d.area_feature_name,
		e.school_property_id,
		e.school_property_name,
		f.school_type_id,
		f.school_type_name
		from t_school a
		left join
		sys_t_province b
		on a.fk_province_id = b.id
		left join
		sys_t_school_nature c
		on a.fk_nature_id = c.id
		left join
		(
			select 
			a.fk_school_id as school_id,
			b.id as area_feature_id,
			b.type as area_feature_name
			from 
			merge_school_area_feature a
			left join
			sys_t_area_feature b
			on a.fk_area_feature_id = b.id
		) as d
		on a.id = d.school_id
		left join
		(
			select 
			a.fk_school_id as school_id,
			b.id as school_property_id,
			b.type as school_property_name
			from merge_school_school_property a
			left join
			sys_t_school_property b
			on a.fk_school_property_id = b.id
		) as e
		on a.id = e.school_id
		left join
		(
			select
			a.fk_school_id as school_id,
			a.fk_school_type_id as school_type_id,
			b.type as school_type_name
			from merge_school_school_type a
			left join
			sys_t_school_type b
			on a.fk_school_type_id = b.id
		) as f
		on a.id = f.school_id
	) as c
	on a.fk_school_id = c.school_id
	left join
	t_major_enrollment_info
	on a.fk_school_id =t_major_enrollment_info.fk_school_id
	left join
	sys_t_major
	on sys_t_major.id =t_major_enrollment_info.fk_major_id
	where a.fk_lots_id =?
	AND
a.accountCategory = ?;`,
  queryScoreRankByCategoryAndYear: `
		select
		*
		from
		t_rank
		where
		(accountCategory=?)
		AND
		(year=? OR year=? OR year=? OR year=?)
	`,
  querySchoolDetail: `select 
	a.id as school_id,
	a.code as school_code,
	a.name as school_name,
	a.fk_province_id as province_id,
	b.province_name,
	a.school_address,
	a.school_phone,
	a.school_intro,
	a.fk_nature_id as school_nature_id,
	c.type as school_nature_name,
	d.area_feature_id,
	d.area_feature_name,
	e.school_property_id,
	e.school_property_name,
	f.school_type_id,
	f.school_type_name,
	g.national_characteristic_major,
	g.province_characteristic_major,
	h.major_admission_principles,
	h.special_requirements
	from t_school a
	left join
	sys_t_province b
	on a.fk_province_id = b.id
	left join
	sys_t_school_nature c
	on a.fk_nature_id = c.id
	left join
	(
		select 
		a.fk_school_id as school_id,
		b.id as area_feature_id,
		b.type as area_feature_name
		from 
		merge_school_area_feature a
		left join
		sys_t_area_feature b
		on a.fk_area_feature_id = b.id
	) as d
	on a.id = d.school_id
	left join
	(
		select 
		a.fk_school_id as school_id,
		b.id as school_property_id,
		b.type as school_property_name
		from merge_school_school_property a
		left join
		sys_t_school_property b
		on a.fk_school_property_id = b.id
	) as e
	on a.id = e.school_id
	left join
	(
		select
		a.fk_school_id as school_id,
		a.fk_school_type_id as school_type_id,
		b.type as school_type_name
		from merge_school_school_type a
		left join
		sys_t_school_type b
		on a.fk_school_type_id = b.id
	) as f
	on a.id = f.school_id
	left join
	t_school_advantage_major g
	on a.id = g.fk_school_id
	left join
	t_school_accepted_principles h
	on a.id = h.fk_school_id
	where a.id = ?`,
  queryLotsScore: `
		select
		*
		from
		sys_t_lots_score
		where
		(
			year = ?
			OR
			year = ?
			OR
			year = ?
			OR
			year = ?
		)
		AND
		accountCategory = ?
	`
};
