// service
import schoolService from '../service/school-service';
// 返回前台的对象
import Result from '../../util/response';

const router = require('koa-router')();

router.prefix('/school');

// 登录路由
router.post('/getSchool', async (ctx) => {
	let { lotId } = ctx.request.body,
		schoolList = await schoolService.getSchoolList(lotId);

	ctx.body = new Result({
		data: schoolList
	});
});

export default router;
