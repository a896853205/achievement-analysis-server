export default {
  // 通过批次查询对应学校
  querySchool: `
	select 
		a.id as school_id,
		a.code as school_code,
		a.name as school_name,
		a.fk_province_code as province_code,
		b.name as province_name,
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
	on a.fk_province_code = b.code
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
	a.name LIKE ?
	ORDER BY
	province_code
	`,

  querySchoolByLotIdAndAccountCategory: `
	-- 根据批次id 查学校
	SELECT 
	a.fk_lots_id as lot_id,
	a.score,
	a.year,
	a.gender,
	a.poverty,
	a.enrollment,
	b.lots_name as lot_name,
	c.*,
	sys_t_major.id as major_id,
	sys_t_major.major_name,
	t_major_enrollment_info.enrollment_score as major_score,
	t_major_enrollment_info.accountCategory
	from 
	merge_school_lots a
	inner join
	sys_t_lots b
	on a.fk_lots_id =b.id
	inner join
	(
		select 
		a.id as school_id,
		a.code as school_code,
		a.name as school_name,
		a.fk_province_code as province_id,
		b.name as province_name,
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
		on a.fk_province_code = b.code
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
		inner join
	t_major_enrollment_info
	on a.fk_school_id =t_major_enrollment_info.fk_school_id
	inner join
	sys_t_major
	on sys_t_major.id =t_major_enrollment_info.fk_major_id
	where
	a.fk_lots_id =t_major_enrollment_info.fk_lot_id
	AND	
	a.fk_lots_id = ?
	AND
	a.accountCategory = ?
	AND
	a.year = t_major_enrollment_info.year
	AND
	(a.year = ? OR a.year = ? OR a.year = ?);
	
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
c.*,
sys_t_major.id as major_id,
sys_t_major.major_name,
t_major_enrollment_info.enrollment_score as major_score
from 
merge_school_lots a
inner join
sys_t_lots b
on a.fk_lots_id =b.id
inner join
(
	select 
	a.id as school_id,
	a.code as school_code,
	a.name as school_name,
	a.fk_province_code as province_code,
	b.name as province_name,
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
	on a.fk_province_code = b.code
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
inner join
t_major_enrollment_info
on a.fk_school_id =t_major_enrollment_info.fk_school_id
inner join
sys_t_major
on sys_t_major.id =t_major_enrollment_info.fk_major_id
where
a.fk_lots_id =t_major_enrollment_info.fk_lot_id
	AND	
a.fk_lots_id = ?
AND
school_name LIKE ?
AND
a.accountCategory = ?
AND
	a.year = t_major_enrollment_info.year
AND
(a.year = ? OR a.year = ? OR a.year = ? OR a.year = ?);
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
		a.major_level_two_code,
		a.comment
		from
		sys_t_major a
	) as c
	on a.fk_major_id = c.major_id
	where 
	a.fk_school_id =?
	and
	a.fk_lot_id =?
	AND
	(a.year = ? OR a.year = ? OR a.year = ?)
	AND
	a.accountCategory = ?
	ORDER BY
	a.year desc
	;
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
	sys_t_major.major_name as major_name,
	t_major_enrollment_info.enrollment_score as major_score,
	t_major_enrollment_info.accountCategory
	from 
	merge_school_lots a
	inner join
	sys_t_lots b
	on a.fk_lots_id =b.id
	inner join
	(
		select 
		a.id as school_id,
		a.code as school_code,
		a.name as school_name,
		a.fk_province_code as province_code,
		b.name as province_name,
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
		on a.fk_province_code = b.code
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
	inner join
	t_major_enrollment_info
	on a.fk_school_id =t_major_enrollment_info.fk_school_id
	inner join
	sys_t_major
	on sys_t_major.id =t_major_enrollment_info.fk_major_id
	where
	t_major_enrollment_info.year = a.year
	AND
	a.fk_lots_id = ?
	AND
	t_major_enrollment_info.fk_lot_id = a.fk_lots_id
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
  // 根据学校id查询学校基本情况
  querySchoolDetail: `
	select 
	a.id as school_id,
	a.code as school_code,
	a.name as school_name,
	a.fk_province_code as province_code,
	a.masterNum as masterNum,
	a.doctorNum as doctorNum,
	a.englishTitle as englishTitle,
	a.schoolCreateTime as schoolCreateTime,
	b.name as province_name,
	a.school_address,
	a.school_phone,
	a.school_intro,
	a.fk_nature_id as school_nature_id,
	a.logoName,
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
	on a.fk_province_code = b.code
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
	`,
  selectSchoolType: `
		SELECT
			*
		FROM
			merge_school_school_type
		WHERE
		  fk_school_id = ?
	`,
  selectSchoolProperty: `
		SELECT
			*
		FROM
			merge_school_school_property
		WHERE
			fk_school_id = ?
		ORDER BY
		  fk_school_property_id
	`,
  selectSchoolBasicInfo: `select 
a.name,
a.fk_province_code,
a.fk_nature_id,
a.school_address,
a.school_phone,
a.school_intro,
a.campus,
a.rank,
a.masterNum,
a.doctorNum,
a.englishTitle,
a.schoolCreateTime
from
t_school as a
where 
a.id =?`,
  // 使用入学id查询优化专业码
  selectDisciplineCodeByVoluntaryInfo: `
		SELECT
			sys_t_discipline.code
		FROM
			t_major_enrollment_info, sys_t_discipline, t_user_voluntary_result
		WHERE
			t_major_enrollment_info.id = t_user_voluntary_result.fk_enrollment_id
		AND
			t_major_enrollment_info.fk_discipline_id = sys_t_discipline.id
		AND
			uuid = ?
		AND
			fk_five_volunteer_id = ?
		AND
			major_index = ?
		`,
  selectMajorFuture: `
		SELECT
			*
		FROM
			sys_t_major_future
		WHERE
			analysisId = ?
		AND
		  disciplineCode = ?
	`,
  querySchoolScores: `
			SELECT
			*
			FROM
			merge_school_lots
			WHERE
			fk_school_id = ? AND accountCategory = ? 
	`,
  selectSchoolLots: `
			SELECT
			*
			FROM
			sys_t_lots	
	`,
  selectSchoolEnrollmentGuideNewsById: `
    SELECT
    uuid,createTime,viewTimes,title
    FROM
    t_school_enrollment_guide_news
    WHERE
    fk_school_id = ?
	`,
  // 通过年份查询当年分数和位次
  queryLotsScoreByCurrentYear: `
		SELECT
		*
		FROM
		t_rank
		WHERE
		year = ?
		AND
		accountCategory = ?`,

  selectSchoolRankById: `
		SELECT 
		ruankeRank,schoolFriendRank,qsRank,usnewsRank,\`rank\`
		FROM
		t_school
		WHERE
		id = ?
	`,
  selectEnrollmentGuideNewsDetail: `
		SELECT
		title,content,viewTimes
		FROM
		t_school_enrollment_guide_news
		WHERE
		uuid = ?
	`,
  updateAddEnrollmentGuideViews: `
		UPDATE
		t_school_enrollment_guide_news
		SET
		viewTimes= viewTimes + 1
		WHERE
		uuid = ?
	`,
  querySchoolAll: `
			SELECT
			name,id,fk_nature_id
			FROM
			t_school
			LIMIT
			?,12
	
	`,
  querySchoolPropertyIdById: `
			SELECT
			fk_school_property_id
			FROM
			merge_school_school_property
			WHERE
			fk_school_id = ?
	`,
  selectSchoolNature: `
			SELECT
			type
			FROM
			sys_t_school_nature
		
	`,
  querySchoolRecommend: `
		SELECT
			*
		FROM
		  t_school_recommend
	`,
};
