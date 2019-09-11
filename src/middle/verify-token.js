import webToken from '../../util/token';
// 返回前台的对象
import Result from '../../util/response';

export default async (ctx, next) => {
  if (ctx.url.match('/users/login')) {
    await next();
  } else {
    // 获取jwt
    const token = ctx.header.authorization;

    if (token) {
      try {
        let data = await webToken.resolveToken(token);

        ctx.state = {
          data
        };

        await next();
      } catch (error) {
        ctx.body = new Result({
          status: 3,
          msg: '请重新登录'
        })
        
      }

    } else {
      await next();
    }
  }
}