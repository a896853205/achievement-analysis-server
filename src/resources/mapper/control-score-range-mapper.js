export default {
  // 通过批次id获取控制分数范围
  queryScoreRangeByLotsId: `
    select
    *
    from
    manage_t_control_score_range
    where
    fk_lots_id=?`,
}