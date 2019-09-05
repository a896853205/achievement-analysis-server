import { Result } from '../../util/response';

const router = require('koa-router')()

router.prefix('/users')

// 登录路由
router.post('/login', function (ctx, next) {
  ctx.body = new Result({});
})

// 注册路由
router.post('/login', function (ctx, next) {
  ctx.body = new Result({});
})

module.exports = router
