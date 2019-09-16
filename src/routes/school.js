// service
import schoolService from '../service/school-service';
import userService from '../service/user-service';
// 返回前台的对象
import Result from '../../util/response';

const router = require('koa-router')();

router.prefix('/school');

// 获得学校
router.post('/getSchool', async (ctx) => {
	let { lotId, natureValues, propertyValues, typeValues, areaFeatureValues } = ctx.request.body,
		schoolList = await schoolService.getSchoolList({ lotId, natureValues, propertyValues, typeValues, areaFeatureValues });

	ctx.body = new Result({
		data: schoolList
	});
});

// 获得专业
router.post('/getMajor', async (ctx) => {
	let { schoolId, lotId } = ctx.request.body,
		user = ctx.state.data,
		majorList = [];

	user = await userService.getUserInfo(user.uuid);
	majorList = await schoolService.getMajorList(schoolId, user.exam_year, lotId);

	ctx.body = new Result({
		data: majorList
	});
});

// 获取批次

export default router;
