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
			schoolItem.gather = 'a';
			schoolListA.push(schoolItem);
		} else if (schoolItem.score >= score2 && schoolItem.score < score3) {
			schoolItem.gather = 'b';
			schoolListB.push(schoolItem);
		} else if (schoolItem.score >= score3 && schoolItem.score < score4) {
			schoolItem.gather = 'c';
			schoolListC.push(schoolItem);
		} else if (schoolItem.score >= score4 && schoolItem.score < score5) {
			schoolItem.gather = 'd';
			schoolListD.push(schoolItem);
		} else if (schoolItem.score >= score5 && schoolItem.score < score6) {
			schoolItem.gather = 'e';
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
