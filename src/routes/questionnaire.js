//service
import questionnaireService from "../service/questionnaire-service";
// 返回前台的对象
import Result from "../../util/response";

const router = require("koa-router")();

router.prefix("/questionnaire");

router.post("/getList", async ctx => {
  ctx.body = new Result({
    data: await questionnaireService.getQuestionList(ctx.state.data.uuid)
  });
});

router.post("/getStatus", async ctx => {
  ctx.body = new Result({
    data: await questionnaireService.getQuestionnaireStatus(ctx.state.data.uuid)
  });
});

router.post("/updateStatus", async ctx => {
  ctx.body = new Result({
    data: await questionnaireService.updateQuestionnaireStatus(
      1,
      ctx.state.data.uuid
    )
  });
});

router.post("/uploadResult", async ctx => {
  let { quesResult } = ctx.request.body;
  ctx.body = new Result({
    data: await questionnaireService.insertQuestionnaireResult(
      quesResult,
      ctx.state.data.uuid
    )
  });
});

router.post("/getRank", async ctx => {
  ctx.body = new Result({
    data: await questionnaireService.getRank(ctx.state.data.uuid)
  });
});

export default router;
