// dao
import schoolDao from '../dao/school-dao';

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

		// 把条件加入进行筛选
		// 判断学校性质
		// 一对一的性质如果大于2,就会返回空数组
		if (natureValues.length) {
			let fitNatureSchoolList = [];

			if (natureValues.length >= 2) {
				resultSchoolList = fitNatureSchoolList;
			}

			for (let schoolItem of resultSchoolList) {
				if (schoolItem.nature_id === natureValues[0]) {
					fitNatureSchoolList.push(schoolItem);
				}
			}
			resultSchoolList = fitNatureSchoolList;
		}
		// 判断学校属性
		if (propertyValues.length) {
			let fitPropertySchoolList = [];

			for (let schoolItem of resultSchoolList) {
				let isFit = true;

				for (let propertyItem of propertyValues) {
					// 一旦有有一个不包括就不适合
					if (!schoolItem.school_property_id.includes(propertyItem)) {
						isFit = false;
					}
				}

				// 如果全适合就push进去
				if (isFit) {
					fitPropertySchoolList.push(schoolItem);
				}
			}

			resultSchoolList = fitPropertySchoolList;
		}
		// 判断高校类别
		if (typeValues.length) {
			let fitTypeSchoolList = [];

			for (let schoolItem of resultSchoolList) {
				let isFit = true;

				for (let typeItem of typeValues) {
					// 一旦有有一个不包括就不适合
					if (!schoolItem.school_type_id.includes(typeItem)) {
						isFit = false;
					}
				}

				// 如果全适合就push进去
				if (isFit) {
					fitTypeSchoolList.push(schoolItem);
				}
			}

			resultSchoolList = fitTypeSchoolList;
		}
		// 判断地域特色
		if (areaFeatureValues.length) {
			let fitTypeSchoolList = [];

			for (let schoolItem of resultSchoolList) {
				let isFit = true;

				for (let areaFeatureItem of areaFeatureValues) {
					// 一旦有有一个不包括就不适合
					if (!schoolItem.area_feature_id.includes(areaFeatureItem)) {
						isFit = false;
					}
				}

				// 如果全适合就push进去
				if (isFit) {
					fitTypeSchoolList.push(schoolItem);
				}
			}

			resultSchoolList = fitTypeSchoolList;
		}

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
