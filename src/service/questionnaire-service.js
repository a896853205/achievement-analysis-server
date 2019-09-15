//dao
import questionnaireDao from "../dao/questionnaire-dao";

//工具类
import { objectHelper } from "../../util/object-helper";

export default {
  //获取所有问题列表
  getQuestionList: async uuid => {
    let questionList = await questionnaireDao.queryQuestionnaireQuestions();
    let test = await questionnaireDao.queryQuestionnaireStatus(uuid);
    console.log("show status", test[0]);
    return {
      questionList
    };
  },
  getQuestionnaireStatus: async uuid => {
    let status = await questionnaireDao.queryQuestionnaireStatus(uuid);
    return {
      status
    };
  }
};
