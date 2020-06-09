import webToken from '../../util/token';
// 返回前台的对象
import Result from '../../util/response';

// service
import userService from '../service/user-service';

// let wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export default async (ctx, next, unlessPathArr) => {
  // await wait(1500);
  for (let i = 0; i < unlessPathArr.length; i++) {
    if (ctx.url.match(unlessPathArr[i])) {
      return true;
    }
  }
  // 获取jwt
  const token = ctx.header.authorization;

  if (token) {
    try {
      let data = await webToken.resolveToken(token);

      let user = await userService.getUserInfo(data.uuid);

      ctx.state = {
        data: user,
      };

      return true;
    } catch (error) {
      ctx.body = new Result({
        status: 3,
        msg: '请重新登录',
      });
    }
  } else {
    return true;
  }
};
