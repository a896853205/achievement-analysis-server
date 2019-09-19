// 工具类
import { objectHelper } from '../../../util/object-helper';

// schoolList初始化 将筛选出来的学校进行去重
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

// 筛选学校性质
export const filtrateNatureSchool = (natureValues, schoolList) => {
	if (natureValues.length) {
		let fitNatureSchoolList = [];

		for (let schoolItem of schoolList) {
			let isFit = false;

			for (let natureItem of natureValues) {
				// 一旦有有一个包括就适合
				if (schoolItem.school_nature_id.includes(natureItem)) {
					isFit = true;
				}
			}

			// 如果适合就push进去
			if (isFit) {
				fitNatureSchoolList.push(schoolItem);
			}
		}

		return fitNatureSchoolList;
	} else {
		return schoolList;
	}
};

// 对学校属性进行筛选
export const filtratePropertySchool = (propertyValues, schoolList) => {
	if (propertyValues.length) {
		let fitPropertySchoolList = [];

		for (let schoolItem of schoolList) {
			let isFit = false;

			for (let propertyItem of propertyValues) {
				// 一旦有有一个包括就适合
				if (schoolItem.school_property_id.includes(propertyItem)) {
					isFit = true;
				}
			}

			// 如果适合就push进去
			if (isFit) {
				fitPropertySchoolList.push(schoolItem);
			}
		}

		return fitPropertySchoolList;
	} else {
		return schoolList;
	}
};

// 对高校类别进行筛选
export const filtrateTypeSchool = (typeValues, schoolList) => {
	if (typeValues.length) {
		let fitTypeSchoolList = [];

		for (let schoolItem of schoolList) {
			let isFit = false;

			for (let typeItem of typeValues) {
				// 一旦有有一个包括就适合
				if (schoolItem.school_type_id.includes(typeItem)) {
					isFit = true;
				}
			}

			// 如果适合就push进去
			if (isFit) {
				fitTypeSchoolList.push(schoolItem);
			}
		}

		return fitTypeSchoolList;
	} else {
		return schoolList;
	}
};

// 对地域特色进行筛选
export const filtrateAreaFeatureSchool = (areaFeatureValues, schoolList) => {
	if (areaFeatureValues.length) {
		let fitTypeSchoolList = [];

		for (let schoolItem of schoolList) {
			let isFit = false;

			for (let areaFeatureItem of areaFeatureValues) {
				// 一旦有有一个包括就适合
				if (schoolItem.area_feature_id.includes(areaFeatureItem)) {
					isFit = true;
				}
			}

			// 如果适合就push进去
			if (isFit) {
				fitTypeSchoolList.push(schoolItem);
			}
		}

		return fitTypeSchoolList;
	} else {
		return schoolList;
	}
};

// 将新的分数转换为旧的分数
export const parseToOldScore = (score, currentRank, oldRank) => {
	currentRank.sort((one, two) => {
		return two.score - one.score;
	});

	oldRank.sort((one, two) => {
		return two.rank - one.rank;
	});

	let fitCurrent = null,
		fitOld = null;

	for (let currentItem of currentRank) {
		if (score >= currentItem.score) {
			fitCurrent = currentItem;
			break;
		}
  }
  
	for (let oldItem of oldRank) {
		if (oldItem.rank >= fitCurrent.rank) {
			fitOld = oldItem;
		}
  }

	return fitOld.score;
};

export const splitSchoolByRange = (score, scoreRange, schoolList, gatherValue) => {
	let score1 = score - scoreRange.down_score_1,
		score2 = score - scoreRange.down_score_2,
		score3 = score - scoreRange.down_score_3,
		score4 = score,
		score5 = score + scoreRange.up_score_4,
		score6 = score + scoreRange.up_score_5,
		schoolListA = [],
		schoolListB = [],
		schoolListC = [],
		schoolListD = [],
    schoolListE = [];

	for (let schoolItem of schoolList) {
		if (schoolItem.score >= score1 && schoolItem.score < score2) {
			schoolListA.push(schoolItem);
		} else if (schoolItem.score >= score2 && schoolItem.score < score3) {
			schoolListB.push(schoolItem);
		} else if (schoolItem.score >= score3 && schoolItem.score < score4) {
			schoolListC.push(schoolItem);
		} else if (schoolItem.score >= score4 && schoolItem.score < score5) {
			schoolListD.push(schoolItem);
		} else if (schoolItem.score >= score5 && schoolItem.score < score6) {
			schoolListE.push(schoolItem);
		}
	}

	switch (gatherValue) {
		case 'a':
      return schoolListA;
		case 'b':
			return schoolListB;
		case 'c':
			return schoolListC;
		case 'd':
			return schoolListD;
		case 'e':
			return schoolListE;
		default:
			return schoolListA;
	}
};
