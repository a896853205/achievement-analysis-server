// 筛选学校性质
// 一对一的性质如果大于2,就会返回空数组
export const filtrateNatureSchool = (natureValues, schoolList) => {
	if (natureValues.length) {
		let fitNatureSchoolList = [];

		if (natureValues.length >= 2) {
			return fitNatureSchoolList;
		}

		for (let schoolItem of schoolList) {
			if (schoolItem.nature_id === natureValues[0]) {
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

    return fitPropertySchoolList;
  } else {
    return schoolList;
  }
}

// 对高校类别进行筛选
export const filtrateTypeSchool = (typeValues, schoolList) => {
  if (typeValues.length) {
    let fitTypeSchoolList = [];

    for (let schoolItem of schoolList) {
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

    return fitTypeSchoolList;
  } else {
    return schoolList;
  }
}

// 对地域特色进行筛选
export const filtrateAreaFeatureSchool = (areaFeatureValues, schoolList) => {
  if (areaFeatureValues.length) {
    let fitTypeSchoolList = [];

    for (let schoolItem of schoolList) {
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

    return fitTypeSchoolList;
  } else {
    return schoolList;
  }
}