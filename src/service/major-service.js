import majorDao from '../dao/major-dao';

export default {
  queryMajorCategory: async () => {
    let [majorLevelTwo, majorLevelOne, majorCategory] = await Promise.all([
      majorDao.queryMajorLevelTwo(),
      majorDao.queryMajorLevelOne(),
      majorDao.queryMajorCategory()
    ]);

    // 将门类数组添加一级学科数组
    for (let majorCategoryItem of majorCategory) {
      majorCategoryItem.data = [];
    }

    // 将一级数组添加二级学科数组
    for (let majorLevelOneItem of majorLevelOne) {
      // 初始化数组
      majorLevelOneItem.data = [];

      let correctMajor = majorCategory.find(item => {
        return (
          item.major_category_code === majorLevelOneItem.major_category_code
        );
      });

      if (correctMajor) {
        correctMajor.data.push(majorLevelOneItem);
      }
    }

    for (let majorLevelTwoItem of majorLevelTwo) {
      let correctMajor = majorLevelOne.find(item => {
        return (
          item.major_level_one_code === majorLevelTwoItem.major_level_one_code
        );
      });

      if (correctMajor && majorLevelTwoItem.major_level_two_code) {
        correctMajor.data.push(majorLevelTwoItem);
      }
    }

    return majorCategory;
  },

  selectMajorDetailByid: async majorTwoCode => {
    let {
        major_name: majorName,
        major_level_one_code: majorLevelOneCode,
        major_category_code: majorCategoryCode
      } = await majorDao.selectMajorNameById(majorTwoCode),
      [majorLevelOne, majorCategory] = await Promise.all([
        majorDao.selectMajorLevelOneByCode(majorLevelOneCode),
        majorDao.selectMajorCategoryByCode(majorCategoryCode)
      ]),
      majorLevelOneName = '',
      majorCategoryName = '';

    if (majorLevelOne) {
      majorLevelOneName = majorLevelOne.name;
      majorCategoryName = majorCategory.name;
    }

    return {
      majorName,
      majorLevelOneName,
      majorCategoryName
    };
  },
  selectMajorDetail: async majorTwoCode => {
    let { id } = await majorDao.selectMajorNameById(majorTwoCode),
      [
        {
          major_intro: majorIntro,
          study_threshold: studyThreshold,
          main_course: mainCourse,
          postgraduate_intro: postgraduateIntro,
          graduate_destination: graduateDestination
        },
        { education_system: educationSystem }
      ] = await Promise.all([
        majorDao.selectMajorIntroById(id),
        majorDao.selectMajorSystemById(id)
      ]);

    return {
      majorIntro,
      studyThreshold,
      mainCourse,
      postgraduateIntro,
      graduateDestination,
      educationSystem
    };
  },
  queryHotMajors: async () => {
    let hotMajors = await majorDao.queryHotMajors();

    let HotMajors = [];

    for (let item of hotMajors) {
      let { fk_major_id } = await majorDao.selectMajorEnrollmentId(
        item.fk_enrollment_id
      );
      let {
        major_level_two_code,
        major_name
      } = await majorDao.selectHotMajorDetail(fk_major_id);

      if (major_level_two_code) {
        HotMajors.push({ major_level_two_code, major_name });
      } else {
        continue;
      }

      if (HotMajors.length >= 7) {
        break;
      }
    }

    return HotMajors;
  },

  querySchoolMajor: async schoolId => {
    let schoolMajor = await majorDao.querySchoolMajor(schoolId);

    let lotsName = new Map();
    lotsName.set(1, '提前批');
    lotsName.set(2, '一批A');
    lotsName.set(3, '一批B');
    lotsName.set(4, '二批A');
    lotsName.set(5, '二批B');
    lotsName.set(6, '三批');
    lotsName.set(7, '专科');

    let schoolMajorList = [];
    let lots_name = '';

    for (let schoolItem of schoolMajor) {
      for (let key of lotsName.keys()) {
        if (key === schoolItem.fk_lot_id) {
          lots_name = lotsName.get(key);
          console.log(lots_name);
          break;
        }
      }
      let {
        major_name,
        comment,
        major_level_two_code
      } = await majorDao.selectSchoolName(schoolItem.fk_major_id);
      schoolMajorList.push({
        enrollment: schoolItem.enrollment,
        enrollment_score: schoolItem.enrollment_score,
        enrollment_score_max: schoolItem.enrollment_score_max,
        year: schoolItem.year,
        major_name,
        comment,
        major_level_two_code,
        lots_name
      });
    }

    return schoolMajorList;
  }
};
