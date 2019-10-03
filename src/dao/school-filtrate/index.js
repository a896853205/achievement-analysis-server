// 工具类
import { objectHelper } from '../../../util/object-helper';

// 将筛选出来的学校进行去重
export const initSchool = schoolList => {
  // {
  //   lot_id: 1,
  //   score: 605,
  //   year: 2018,
  //   gender: 0,
  //   poverty: 0,
  //   lot_name: '提前批',
  //   school_id: 334,
  //   school_code: '4122010200',
  //   school_name: '东北师范大学',
  //   province_id: 9,
  //   province_name: '吉林',
  //   school_nature_id: 1,
  //   school_nature_name: '公办',
  //   area_feature_id: null,
  //   area_feature_name: null,
  //   school_property_id: null,
  //   school_property_name: null,
  //   school_type_id: null,
  //   school_type_name: null }
  let resultSchoolList = [];

  for (let i = 0; i < schoolList.length; i++) {
    if (
      resultSchoolList.findIndex(resultItem => {
        return schoolList[i].school_id === resultItem.school_id;
      }) !== -1
    ) {
      continue;
    }

    // 把一样的学校放在一起
    let oneSchoolArr = [schoolList[i]];

    for (let j = i + 1; j < schoolList.length; j++) {
      if (schoolList[i].school_id === schoolList[j].school_id) {
        oneSchoolArr.push(schoolList[j]);
      }
    }

    let oneSchoolObj = objectHelper.deepCopy(schoolList[i]);

    oneSchoolObj.scoreAndRank = [];
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
      if (
        !oneSchoolObj.school_property_id.includes(school.school_property_id)
      ) {
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

      // 分数年份和招生人数存入数组里
      if (!oneSchoolObj.scoreAndRank.find(item => item.year === school.year)) {
        oneSchoolObj.scoreAndRank.push({
          year: school.year,
          score: school.score,
          enrollment: school.enrollment
        });
      }
    }

    delete oneSchoolObj.year;
    delete oneSchoolObj.score;

    resultSchoolList.push(oneSchoolObj);
  }

  return resultSchoolList;
};
