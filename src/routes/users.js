// service
import userService from '../service/user-service';
// 返回前台的对象
import Result from '../../util/response';

//uuid
import uuidV1 from 'uuid/v1';

const router = require('koa-router')();

router.prefix('/users');

/**
 * 登录路由
 * POST请求
 * userName {String} 用户名
 * passWord {String} 密码
 *
 * data {Object} 用户相信信息
 */
router.post('/login', async ctx => {
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
router.post('/getUserInfo', async ctx => {
  let user = ctx.state.data;

  ctx.body = new Result({
    data: user
  });
});

// 设置用户基本信息(高考决策第一步)
router.post('/setUserInfo', async ctx => {
  let {
      nickname,
      gender,
      phone,
      email,
      score,
      accountCategory,
      address,
      examYear,
      highSchool
    } = ctx.request.body,
    user = ctx.state.data;

  if (user.scoreAlterTime > 0) {
    const [basicResult, importResult] = await Promise.all([
      userService.setUserBasicInfo({
        nickname,
        phone,
        email,
        address,
        uuid: user.uuid,
        highSchool
      }),
      userService.setUserImportInfo({
        examYear,
        gender,
        accountCategory,
        score,
        scoreAlterTime: user.scoreAlterTime - 1,
        uuid: user.uuid,
        userRole: user.roleCode
      })
    ]);

    if (basicResult && importResult) {
      ctx.body = new Result({
        msg: '已更新基本用户信息',
        data: importResult
      });
    } else {
      ctx.body = new Result({
        status: 0,
        msg: '基本用户信息不完整,请填写完整'
      });
    }
  } else {
    ctx.body = new Result({
      status: 0,
      msg: '修改用户重要信息次数不足,请充值'
    });
  }
});

router.post('/setUserBasicInfo', async ctx => {
  let { nickname, phone, email, address, highSchool } = ctx.request.body,
    user = ctx.state.data;

  let result = await userService.setUserBasicInfo({
    nickname,
    phone,
    email,
    address,
    uuid: user.uuid,
    highSchool
  });

  if (result) {
    ctx.body = new Result({
      msg: '已更新基本用户基本信息',
      data: result
    });
  } else {
    ctx.body = new Result({
      status: 0,
      msg: '基本用户信息不完整,请填写完整'
    });
  }
});

router.post('/setUserImportInfo', async ctx => {
  let { examYear, gender, accountCategory, score } = ctx.request.body,
    user = ctx.state.data;

  if (user.scoreAlterTime > 0) {
    let result = await userService.setUserImportInfo({
      examYear,
      gender,
      accountCategory,
      score,
      scoreAlterTime: user.scoreAlterTime - 1,
      uuid: user.uuid,
      userRole: user.roleCode
    });

    if (result) {
      ctx.body = new Result({
        msg: '已更新基本用户重要信息',
        data: result
      });
    } else {
      ctx.body = new Result({
        status: 0,
        msg: '重要用户信息不完整,请填写完整'
      });
    }
  } else {
    ctx.body = new Result({
      status: 0,
      msg: '修改用户重要信息次数不足,请充值'
    });
  }
});

// 修改密码
router.post('/alterPassword', async ctx => {
  let { oldPassword, newPassword } = ctx.request.body,
    user = ctx.state.data,
    result = await userService.alterPassword(
      oldPassword,
      newPassword,
      user.password,
      user.uuid
    );

  if (result) {
    ctx.body = new Result({
      msg: '已更新密码'
    });
  } else {
    ctx.body = new Result({
      status: 0,
      msg: '原密码不正确'
    });
  }
});

// 注册路由
router.post('/register', async ctx => {
  let { username, password } = ctx.request.body,
    // 判断用户名是否存在
    findResult = await userService.checkUser(username);
  if (findResult) {
    ctx.body = new Result({
      status: 0,
      msg: '用户名已存在'
    });
  } else {
    // 插入数据
    // 生成一个唯一的uuid
    let userUuid = uuidV1().replace(/-/g, '');
    await userService.saveUser(username, password, userUuid);
    ctx.body = new Result({
      msg: '注册成功'
    });
  }
});

// 注册获取手机验证码
router.post('/saveVerifyCode', async ctx => {
  let { username } = ctx.request.body;

  await userService.saveVerifyCode(username);

  ctx.body = new Result({
    msg: '已发送验证码'
  });
});

// 获取当年的位次和对应去年的分数和位次
router.post('/getScoreRank', async ctx => {
  let { score, examYear, accountCategory } = ctx.request.body,
    scoreRankArr = await userService.getScoreRank({
      score,
      examYear,
      accountCategory
    });

  ctx.body = new Result({
    data: scoreRankArr
  });
});

export default router;
