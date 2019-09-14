// dao
import schoolDao from '../dao/school-dao';

// 工具类
import { objectHelper } from '../../util/object-helper';

export default {
	// 获取所有学校通过批次id
	getSchoolList: async (lotId) => {
		let schoolList = await schoolDao.querySchoolByLotId(lotId);

		// 将筛选出来的学校进行去重

		let resultSchoolList = [];

		for (let i = 0; i < schoolList.length; i++) {

      if(resultSchoolList.findIndex(resultItem => {
        return schoolList[i].school_id === resultItem.school_id;
      }) !== -1) {
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
			oneSchoolObj.school_property = [];
			oneSchoolObj.school_type_id = [];
			oneSchoolObj.school_type = [];

			for (let school of oneSchoolArr) {

				// 判断属性id有没有
				if (!oneSchoolObj.school_property_id.includes(school.school_property_id)) {
					oneSchoolObj.school_property_id.push(school.school_property_id);
					oneSchoolObj.school_property.push(school.school_property);
        }
        
				// 判断类型id有没有
				if (!oneSchoolObj.school_type_id.includes(school.school_type_id)) {
					oneSchoolObj.school_type_id.push(school.school_type_id);
					oneSchoolObj.school_type.push(school.school_type);
				}
      }
      
      resultSchoolList.push(oneSchoolObj);
    }
    
		return {
			schoolList: resultSchoolList
		};
	}
};
