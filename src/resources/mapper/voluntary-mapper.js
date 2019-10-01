export default {
  insertVoluntary: `
    insert
    into
    t_user_voluntary_result
    (uuid, fk_five_volunteer_id, fk_school_id, fk_major_id, major_index, submit_time, fk_lots_id, fk_user_uuid, gender, year, gather)
    values
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
    merge_school_lots.score
FROM
  t_user_voluntary_result,sys_t_lots,sys_t_five_volunteer,t_school,sys_t_major,merge_school_lots,t_major_enrollment_info
WHERE
  t_user_voluntary_result.uuid = ?
  AND
  -- 1
  sys_t_lots.id = t_user_voluntary_result.fk_lots_id
  AND
  t_user_voluntary_result.fk_lots_id = merge_school_lots.fk_lots_id
  AND
  merge_school_lots.fk_lots_id = t_major_enrollment_info.fk_lot_id
  AND
  sys_t_five_volunteer.id = t_user_voluntary_result.fk_five_volunteer_id
  AND
  -- 1
  t_school.id = t_user_voluntary_result.fk_school_id
  AND
  t_user_voluntary_result.fk_school_id = merge_school_lots.fk_school_id
  AND
  merge_school_lots.fk_school_id = t_major_enrollment_info.fk_school_id
  AND
  -- 350,520
  sys_t_major.id = t_user_voluntary_result.fk_major_id
  AND
  t_user_voluntary_result.fk_major_id = t_major_enrollment_info.fk_major_id
  AND
  t_user_voluntary_result.year = t_major_enrollment_info.year
  AND
  t_major_enrollment_info.year = merge_school_lots.year
  AND
  t_user_voluntary_result.gender = merge_school_lots.gender;
  `
}