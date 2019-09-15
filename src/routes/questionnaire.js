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
  let status = await questionnaireService.getQuestionnaireStatus(
    ctx.state.data.uuid
  );
  if (!status.status[0].isEvaluate) {
    await questionnaireService.updateQuestionnaireStatus(
      1,
      ctx.state.data.uuid
    );
    ctx.body = new Result({
      data: await questionnaireService.insertQuestionnaireResult(
        quesResult.join(","),
        ctx.state.data.uuid
      )
    });
  } else {
    ctx.body = new Result({
      data: "fuck off"
    });
  }
});

export default router;
