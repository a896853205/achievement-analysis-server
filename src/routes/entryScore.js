// 返回前台的对象
import Result from '../../util/response';
// service
import entryScoreService from '../service/entry-score-service';

const router = require('koa-router')()

router.prefix('/entryScore')

router.get('/getEntryScore', async ctx => {
  let user = ctx.state.data,
    entryScoreList = await entryScoreService.getEntryScore(user);

  ctx.body = new Result({
    data: entryScoreList
  })
})

export default router;