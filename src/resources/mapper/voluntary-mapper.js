export default {
  insertVoluntary: `
    INSERT
    INTO
    t_user_voluntary_result
    (uuid, fk_five_volunteer_id, fk_school_id, fk_enrollment_id, major_index, submit_time, fk_lots_id, fk_user_uuid, gender, year, gather, reportType)
    VALUES
    ?`,
  queryVoluntaryByVoluntaryUuid: `
  SELECT 
    t_user_voluntary_result.uuid, 
    fk_five_volunteer_id, 
    sys_t_five_volunteer.volunteer_name, 
    t_major_enrollment_info.fk_school_id, 
    t_school.name, 
    t_major_enrollment_info.fk_major_id, 
    sys_t_major.major_name, 
    major_index, 
    submit_time, 
    t_user_voluntary_result.fk_lots_id,
    t_major_enrollment_info.year,
    sys_t_lots.lots_name,
    gather,
    t_major_enrollment_info.enrollment,
    merge_school_lots.score,
    merge_school_lots.enrollment
  FROM
    t_user_voluntary_result,sys_t_lots,sys_t_five_volunteer,t_school,sys_t_major,merge_school_lots,t_major_enrollment_info
  WHERE
    t_user_voluntary_result.uuid = ?
  AND
    sys_t_lots.id = t_user_voluntary_result.fk_lots_id
  AND
    t_user_voluntary_result.fk_lots_id = merge_school_lots.fk_lots_id
  AND
    merge_school_lots.fk_lots_id = t_major_enrollment_info.fk_lot_id
  AND
    sys_t_five_volunteer.id = t_user_voluntary_result.fk_five_volunteer_id
  AND
    t_school.id = t_user_voluntary_result.fk_school_id
  AND
    t_user_voluntary_result.fk_school_id = merge_school_lots.fk_school_id
  AND
    merge_school_lots.fk_school_id = t_major_enrollment_info.fk_school_id
  AND
    t_major_enrollment_info.id = t_user_voluntary_result.fk_enrollment_id
  AND
    sys_t_major.id = t_major_enrollment_info.fk_major_id
  AND
    t_user_voluntary_result.year = t_major_enrollment_info.year
  AND
    t_major_enrollment_info.year = merge_school_lots.year
  AND
    t_user_voluntary_result.gender = merge_school_lots.gender;
  `,
  // 通过用户uuid查询志愿表
  queryVoluntaryByUserUuid: `
  SELECT 
    t_user_voluntary_result.uuid,
    submit_time, 
    t_user_voluntary_result.fk_lots_id,
    t_major_enrollment_info.year,
    sys_t_lots.lots_name,
    reportType
  FROM
    t_user_voluntary_result,sys_t_lots,t_major_enrollment_info
  WHERE
    t_user_voluntary_result.fk_user_uuid = ?
  AND
    sys_t_lots.id = t_user_voluntary_result.fk_lots_id
  AND
    t_major_enrollment_info.id = t_user_voluntary_result.fk_enrollment_id
  AND
    t_user_voluntary_result.year = t_major_enrollment_info.year;
  `,
  queryVoluntaryListByVoluntaryUuid: `
  SELECT 
    fk_five_volunteer_id,
    t_school.name,
    major_index,
    sys_t_major.major_name
  FROM
    t_user_voluntary_result, t_school, t_major_enrollment_info, sys_t_major
  WHERE
    t_user_voluntary_result.fk_school_id = t_school.id
  AND
    fk_enrollment_id = t_major_enrollment_info.id
  AND
    t_major_enrollment_info.fk_major_id = sys_t_major.id
  AND
    uuid = ?
  `,
  selectVoluntaryResultByVolunteerAndMajorIndex: `
  SELECT 
    *
  FROM 
    t_user_voluntary_result,merge_school_lots
  WHERE
    t_user_voluntary_result.fk_five_volunteer_id = ?
  AND
    t_user_voluntary_result.major_index = ?
  AND
    t_user_voluntary_result.uuid = ?
  AND
    t_user_voluntary_result.year = merge_school_lots.year`,
  insertTempVoluntary: `
  INSERT
  INTO
    t_voluntary_temp
    (voluntaryStr, userUuid)
  VALUES
    (?, ?)
  `,
  selectTempVoluntary: `
  SELECT
    *
  FROM
    t_voluntary_temp
  WHERE
    userUuid = ?
  `,
  updateTempVoluntary: `
  UPDATE
    t_voluntary_temp
  SET
    voluntaryStr = ?
  WHERE
    userUuid = ?
  `,
  selectTempVoluntary: `
  SELECT
    voluntaryStr
  FROM
    t_voluntary_temp
  WHERE
    userUuid = ?
  `
};
