// service
import schoolService from '../service/school-service';
import userService from '../service/user-service';
// 返回前台的对象
import Result from '../../util/response';

const router = require('koa-router')();

router.prefix('/school');

// 获得学校
router.post('/getSchool', async (ctx) => {
	let { lotId, natureValues, propertyValues, typeValues, areaFeatureValues, gatherValue } = ctx.request.body,
		user = ctx.state.data,
		schoolList = await schoolService.getSchoolList({
			lotId,
			natureValues,
			propertyValues,
			typeValues,
			areaFeatureValues,
			gatherValue,
			accountCategory: user.account_category,
			examYear: user.exam_year,
			score: user.score
		});

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

router.post('/getSchoolDetail', async (ctx) => {
	let { schoolId } = ctx.request.body;

	let schoolDetail = await schoolService.getSchoolDetail(schoolId);

	ctx.body = new Result({
		data: schoolDetail
	});
});

// 获取批次

export default router;
