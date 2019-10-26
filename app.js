import Koa from 'koa';
import json from 'koa-json';
import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';

// 跨域
import cors from 'koa2-cors';

// 路由
import users from './src/routes/users';
import system from './src/routes/system';
import entryScore from './src/routes/entryScore';
import school from './src/routes/school';
import questionnaire from './src/routes/questionnaire';
import voluntary from './src/routes/voluntary';
import news from './src/routes/news';
import indexData from './src/routes/index-data';
import major from './src/routes/major';
// key
import { TOKEN_KEY } from './src/constants/keys';

// 中间件
import getToken from './src/middle/verify-token';
import Result from './util/response';
import jwt from 'koa-jwt';

const app = new Koa();

// 跨域
app.use(cors());

app.use(async (ctx, next) => {
  return next().catch(err => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = new Result({
        status: 3,
        msg: '请重新登录'
      });
    } else {
      throw err;
    }
  });
});

let unlessPathArr = [
  '/users/register',
  '/users/login',
  /^\/system/,
  /^\/news/,
  /^\/index/,
  '/school/searchSchool',
  '/school/getSchoolDetail',
  '/school/getSchoolScoreList',
  '/school/getEnrollmentGuideNews',
  '/school/getSchoolRank',
  '/school/getEnrollmentGuideNewsDetail'
];

app.use(
  jwt({
    secret: TOKEN_KEY
  }).unless({
    path: unlessPathArr
  })
);

// error handler
// onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 获取token中的值
app.use(async (ctx, next) => {
  if (await getToken(ctx, next, unlessPathArr)) {
    await next();
  }
});

// routes
app.use(users.routes(), users.allowedMethods());
app.use(system.routes(), system.allowedMethods());
app.use(entryScore.routes(), entryScore.allowedMethods());
app.use(school.routes(), school.allowedMethods());
app.use(questionnaire.routes(), questionnaire.allowedMethods());
app.use(voluntary.routes(), voluntary.allowedMethods());
app.use(news.routes(), voluntary.allowedMethods());
app.use(indexData.routes(), voluntary.allowedMethods());
app.use(major.routes(), voluntary.allowedMethods());
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
  ctx.body = new Result({
    status: 0,
    msg: '网络有点问题呦,请稍后再试'
  });
});

module.exports = app;
