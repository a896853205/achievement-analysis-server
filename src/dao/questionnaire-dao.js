// 数据库操作
import { db, SqlObject } from "../resources/db-connect";

// 数据库语句
import questionnaireMapper from "../resources/mapper/questionnaire-mapper";

export default {
  // 返回问题列表
  queryQuestionnaireQuestions: async () => {
    let questionList = await db.query(
      new SqlObject(questionnaireMapper.queryQuestionnaire)
    );
    return questionList;
  },
  // 更新问卷状态
  updateQuestionnaireStatus: async (status, uuid) => {
    let result = await db.query(
      new SqlObject(questionnaireMapper.updateQuestionnaireMark, [status, uuid])
    );
    return result;
  },
  // 插入问卷结果
  insertQuestionnaireResult: async (quesResult, uuid) => {
    let result = await db.query(
      new SqlObject(questionnaireMapper.insertQuestionnaireResult, [
        uuid,
        quesResult
      ])
    );
    return result;
  },
  // 获取问卷状态
  queryQuestionnaireStatus: async uuid => {
    let status = await db.query(
      new SqlObject(questionnaireMapper.queryQuestionnaireMark, [uuid])
    );
    return status;
  }
};
