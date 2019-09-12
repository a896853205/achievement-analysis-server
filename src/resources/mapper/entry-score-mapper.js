export default {
  queryByUserUuid: `select 
  -- a.id,
  -- a.uuid,
  -- a.phone,
  -- a.username,
  -- a.nickname,
  -- a.address_province,
  -- d.province_name,
  -- a.simulated_count,
  -- a.exam_year,
  c.lot_name,
  b.id as lot_id,
  b.score
  -- b.year as lot_year
  from
  (
    select *
    from t_user
    where uuid = ?
  ) a
  left join
  t_entry_score b
  on a.address_province = b.fk_province_id
  left join
  sys_t_lots c
  on b.fk_lot_id = c.id
  left join
  sys_t_province d
  on a.address_province = d.id
  where a.exam_year-1 = b.year;`
}