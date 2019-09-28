export default {
  insertVoluntary: `
    insert
    into
    t_user_voluntary_result
    (uuid, fk_five_volunteer_id, fk_school_id, fk_major_id, major_index, submit_time, fk_lots_id, fk_user_uuid, gather)
    values
    ?`,
  queryVoluntaryByVoluntaryUuid: `
    SELECT 
    uuid, fk_five_volunteer_id, sys_t_five_volunteer.volunteer_name, fk_school_id, t_school.name, fk_major_id, sys_t_major.major_name, major_index, submit_time, fk_lots_id, sys_t_lots.lots_name, gather
    FROM
    t_user_voluntary_result,sys_t_lots,sys_t_five_volunteer,t_school,sys_t_major
    WHERE
    uuid = ?
    AND
    sys_t_lots.id = fk_lots_id
    AND
    sys_t_five_volunteer.id = fk_five_volunteer_id
    AND
    t_school.id = fk_school_id
    AND
    sys_t_major.id = fk_major_id
  `
}