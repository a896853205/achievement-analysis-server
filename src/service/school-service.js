// dao
import schoolDao from '../dao/school-dao';

// 筛选算法
import { 
	filtrateNatureSchool,
	filtratePropertySchool,
	filtrateTypeSchool,
	filtrateAreaFeatureSchool
} from './school-filtrate';

// 工具类
import { objectHelper } from '../../util/object-helper';

export default {
	// 获取所有学校通过批次id
	getSchoolList: async ({ lotId, natureValues, propertyValues, typeValues, areaFeatureValues }) => {
		let schoolList = await schoolDao.querySchoolByLotId(lotId);
		// 将筛选出来的学校进行去重

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

			oneSchoolObj.school_property_id = [];
			oneSchoolObj.school_property_name = [];
			oneSchoolObj.school_type_id = [];
			oneSchoolObj.school_type_name = [];
			oneSchoolObj.school_type_id = [];
			oneSchoolObj.school_type_name = [];
			oneSchoolObj.area_feature_id = [];
			oneSchoolObj.area_feature_name = [];

			for (let school of oneSchoolArr) {
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

		// 对办学性质进行筛选
		resultSchoolList = filtrateNatureSchool(natureValues, resultSchoolList);

		// 对学校属性进行筛选
		resultSchoolList = filtratePropertySchool(propertyValues, resultSchoolList);
		
		// 对高校类别进行筛选
		resultSchoolList = filtrateTypeSchool(typeValues, resultSchoolList);

		// 对地域特色进行筛选
		resultSchoolList = filtrateAreaFeatureSchool(areaFeatureValues, resultSchoolList);

		return {
			schoolList: resultSchoolList
		};
	},

	// 模拟获取专业
	getMajorList: async (schoolId, examYear, lotId) => {
		// 通过schoolID 和 当前年份 获取专业
		let majorList = await schoolDao.queryMajorBySchoolIdAndYear(schoolId, examYear - 1, lotId);

		return {
			majorList
		};
	}
};
