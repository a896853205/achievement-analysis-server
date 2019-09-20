// 工具类
import { objectHelper } from '../../../util/object-helper';

// 将筛选出来的学校进行去重
export const initSchool = (schoolList) => {
	let resultSchoolList = [];

	for (let i = 0; i < schoolList.length; i++) {
		if (
			resultSchoolList.findIndex((resultItem) => {
				return schoolList[i].school_id === resultItem.school_id;
			}) !== -1
		) {
			continue;
		}

		let oneSchoolArr = [ schoolList[i] ];

		for (let j = i + 1; j < schoolList.length; j++) {
			if (schoolList[i].school_id === schoolList[j].school_id) {
				oneSchoolArr.push(schoolList[j]);
			}
		}

		let oneSchoolObj = objectHelper.deepCopy(schoolList[i]);

		oneSchoolObj.school_nature_id = [];
		oneSchoolObj.school_nature_name = [];
		oneSchoolObj.school_property_id = [];
		oneSchoolObj.school_property_name = [];
		oneSchoolObj.school_type_id = [];
		oneSchoolObj.school_type_name = [];
		oneSchoolObj.school_type_id = [];
		oneSchoolObj.school_type_name = [];
		oneSchoolObj.area_feature_id = [];
		oneSchoolObj.area_feature_name = [];

		for (let school of oneSchoolArr) {
			// 判断性质id有没有
			if (!oneSchoolObj.school_nature_id.includes(school.school_nature_id)) {
				oneSchoolObj.school_nature_id.push(school.school_nature_id);
				oneSchoolObj.school_nature_name.push(school.school_nature_name);
			}

			// 判断属性id有没有
			if (!oneSchoolObj.school_property_id.includes(school.school_property_id)) {
				oneSchoolObj.school_property_id.push(school.school_property_id);
				oneSchoolObj.school_property_name.push(school.school_property_name);
			}

			// 判断类型id有没有
			if (!oneSchoolObj.school_type_id.includes(school.school_type_id)) {
				oneSchoolObj.school_type_id.push(school.school_type_id);
				oneSchoolObj.school_type_name.push(school.school_type_name);
			}

			// 判断地域id有没有
			if (!oneSchoolObj.area_feature_id.includes(school.area_feature_id)) {
				oneSchoolObj.area_feature_id.push(school.area_feature_id);
				oneSchoolObj.area_feature_name.push(school.area_feature_name);
			}
		}

		resultSchoolList.push(oneSchoolObj);
	}

	return resultSchoolList;
};