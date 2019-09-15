//dao
import questionnaireDao from "../dao/questionnaire-dao";

//工具类
import { objectHelper } from "../../util/object-helper";

export default {
  //获取所有问题列表
  getQuestionList: async uuid => {
    return {
      questionList: await questionnaireDao.queryQuestionnaireQuestions()
    };
  },
  getQuestionnaireStatus: async uuid => {
    let status = await questionnaireDao.queryQuestionnaireStatus(uuid);
    return {
      status
    };
  },
  updateQuestionnaireStatus: async (status, uuid) => {
    return {
      status: await questionnaireDao.updateQuestionnaireStatus(status, uuid)
    };
  },
  insertQuestionnaireResult: async (quesResult, uuid) => {
    return {
      status: await questionnaireDao.insertQuestionnaireResult(quesResult, uuid)
    };
  }
};
