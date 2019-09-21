export default {
  insertVoluntary: `
  insert
  into
  t_user_voluntary_result
  (uuid, fk_five_volunteer_id, fk_school_id, fk_major_id, major_index, submit_time, fk_lots_id, fk_user_uuid)
  values
  ?`
}