// service
import userService from '../service/user-service';
// 返回前台的对象
import Result from '../../util/response';

const router = require('koa-router')();

router.prefix('/users');

// 登录路由
router.post('/login', async (ctx) => {
	let { userName, passWord } = ctx.request.body,
		data = await userService.login(userName, passWord);

	if (data) {
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
router.post('/getUserInfo', async (ctx) => {
	let user = ctx.state.data;

	ctx.body = new Result({
		data: user
	});
});

// 设置用户基本信息(高考决策第一步, 或者个人修改页面)
router.post('/setUserInfo', async (ctx) => {
	let { nickname, gender, score, accountCategory, addressProvince, examYear } = ctx.request.body,
		user = ctx.state.data;

		let result = await userService.setUserInfo(
			nickname,
			gender,
			score,
			accountCategory,
			addressProvince,
			examYear,
			user.uuid
		);

		if (result) {
			ctx.body = new Result({
				msg: '已更新基本用户信息',
				data: result
			});
		} else {
			ctx.body = new Result({
				status: 0,
				msg: '基本用户信息不完整,请填写完整'
			});
		}
	}
);

// 修改密码
router.post('/alterPassword', async (ctx) => {
	let { oldPassword, newPassword } = ctx.request.body,
		user = ctx.state.data,
    result = await userService.alterPassword(oldPassword, newPassword, user.password, user.uuid);
    
  if (result) {
    ctx.body = new Result({
      msg: '已更新密码',
    });
  } else {
    ctx.body = new Result({
      status: 0,
      msg: '原密码不正确'
    });
  }
});

// 注册路由
router.post('/register', ctx => {
  ctx.body = new Result({});
});

export default router;
