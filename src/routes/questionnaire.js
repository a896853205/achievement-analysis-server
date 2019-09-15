//service
import questionnaireService from "../service/questionnaire-service";
// 返回前台的对象
import Result from "../../util/response";

const router = require("koa-router")();

router.prefix("/questionnaire");

router.post("/test", async ctx => {
  let questions = await questionnaireService.getQuestionList(
    ctx.state.data.uuid
  );
  ctx.body = new Result({
    data: questions
  });
});

router.post("/getStatus", async ctx => {
  let status = await questionnaireService.getQuestionnaireStatus(
    ctx.state.data.uuid
  );
  ctx.body = new Result({
    data: status
  });
});

export default router;
