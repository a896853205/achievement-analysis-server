// service
import userService from '../service/user-service';
// 返回前台的对象
import Result from '../../util/response';

const router = require('koa-router')()

router.prefix('/users')

// 登录路由
router.post('/login', async ctx => {
  let { userName, passWord } = ctx.request.body,
    data = await userService.login(userName, passWord);

  if (data.token) {
    ctx.body = new Result({
      data,
      status: 2
    });
  } else {
    ctx.body = new Result({
      status: 0,
      msg: '用户名或密码错误'
    });
  }
});

// 获取用户基本信息
router.post('/getUserInfo', async ctx => {
  let user = ctx.state.data;

  // user = await userService.getUserInfo(user.uuid);
  ctx.body = new Result({
    data: user
  })
});

// 设置用户基本信息(高考决策第一步, 或者个人修改页面)
router.post('/setUserInfo', async ctx => {
  let { nickname, gender, score, accountCategory } = ctx.request.body,
    user = ctx.state.data;

  if (user.confirm === 1) {
    ctx.body = new Result({
      status: 0,
      msg: '已经确认基本用户信息,禁止修改'
    });
  } else if (user.confirm === 0) {
    let result = await userService.setUserInfo(nickname, gender, score, accountCategory, user.uuid);
    if (result) {
      ctx.body = new Result({
        msg: '已更新基本用户信息'
      });
    } else {
      ctx.body = new Result({
        status: 0,
        msg: '基本用户信息不完整,请填写完整'
      });
    }
  }
})

// 注册路由
router.post('/register', ctx => {
  ctx.body = new Result({});
});

export default router;
