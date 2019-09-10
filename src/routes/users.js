// service
import userService from '../service/user-service';
// 返回前台的对象
import Result from '../../util/response';

const router = require('koa-router')()

router.prefix('/users')

// 登录路由
router.post('/login', async ctx => {
  let { userName, passWord } = ctx.request.body,
    token = await userService.login(userName, passWord);

  if (token) {
    ctx.body = new Result({
      data: token,
      status: 2
    });
  } else {
    ctx.body = new Result({
      status: 0,
      msg: '用户名或密码错误'
    });
  }
});

// 注册路由
router.post('/register', ctx => {
  ctx.body = new Result({});
});

export default router;
