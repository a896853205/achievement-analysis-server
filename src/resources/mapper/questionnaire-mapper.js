export default {
  //获取问卷问题
  queryQuestionnaire: `
    select
    *
    from
    sys_t_question`,
  //更新测评标识为1
  updateQuestionnaireMark: `
    update t_user
    set isEvaluate = ?
    where uuid = ?;`,
  //插入问卷结果
  insertQuestionnaireResult: `
    insert into 
    t_user_evaluate_result (fk_user_id,evaluate_result) 
    values (
    (select id from t_user where uuid = ?),?);`,
  //获取测评标识
  queryQuestionnaireMark: `
    select 
    id,
    uuid,
    isEvaluate
    from t_user 
    where uuid = ?;`,
  //获取测评结果
  queryQuestionnaireResult: `
    select *
    from 
    t_user_evaluate_result 
    where fk_user_id = (select id from t_user where uuid = ?);`,
  //获取测评标准
  queryQuestionnaireStandard: `
    select * 
    from
    sys_t_job_interest_type`
};
