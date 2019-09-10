import webToken from '../../util/token';

export default async (ctx, next) => {
  // 获取jwt
  const token = ctx.header.authorization;

  if (token) {
    let data = await webToken.resolveToken(token);

    ctx.state = {
      data: data
    };
    
    await next();
  } else {
    await next();
  }
}