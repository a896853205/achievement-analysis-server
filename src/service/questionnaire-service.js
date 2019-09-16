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
    let status = await questionnaireDao.queryQuestionnaireStatus(uuid);
    console.log("sss", status);
    if (!status[0].isEvaluate) {
      await questionnaireDao.updateQuestionnaireStatus(1, uuid);
      return {
        status: await questionnaireDao.insertQuestionnaireResult(
          quesResult.join(","),
          uuid
        )
      };
    } else {
      return {
        status: "502"
      };
    }
  },
  getQuestionnaireResult: async uuid => {
    let result = await questionnaireDao.queryQuestionnaireResult(uuid);
    result = result[0].evaluate_result;
    result = result.toString().split(",");
    return {
      result
    };
  },
  getRank: async uuid => {
    let [quesResult, quesStandard] = await Promise.all([
      questionnaireDao.queryQuestionnaireResult(uuid),
      questionnaireDao.queryQuestionnaireStandard()
    ]);
    let returnResult = [];
    quesResult = quesResult[0].evaluate_result.toString().split(",");
    quesStandard = quesStandard.map(item => {
      item.rank = 0;
      item.select_is_question_num = item.select_is_question_num
        .toString()
        .split(",");
      item.select_no_question_num = item.select_no_question_num
        .toString()
        .split(",");
      item.select_is_question_num.forEach(quesNum => {
        if (quesResult[quesNum - 1] === "1") {
          item.rank = item.rank + 1;
        }
      });
      item.select_no_question_num.forEach(quesNum => {
        if (!quesResult[quesNum - 1] === "0") {
          item.rank = item.rank + 1;
        }
      });
      returnResult.push({
        typeName: item.type,
        typeCode: item.type_code,
        typicalCarrer: item.typical_career,
        matchMajor: item.match_major,
        rank: item.rank
      });
      return item;
    });
    console.log("reresult", returnResult);
    return {
      returnResult
    };
  }
};