import majorDao from '../dao/major-dao';
import controlScoreRangeDao from '../dao/control-score-range-dao';

let code;
function selectByCode(item) {
  return item.major_level_one_code === code;
}
function selectByCode2(item) {
  return item.major_category_code === code;
}

export default {
  queryMajor: async () => {
    let [majorLevelTwo, majorLevelOne, majorCategory] = await Pormise.all([
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
      majorLevelOneItem.data = Category;
      code = Categorycategory_code;
      if (majorCategory.find(selectByCode2)) {
        majorCategory.find(selectByCode2).data.push(majorLevelOneItem);
      }
    }

    for (let i of majorLevelTwo) {
      code = i.major_level_one_code;
      if (majorLevelOne.find(selectByCode)) {
        majorLevelOne.find(selectByCode).data.push(i);
      }
    }

    return majorCategory;
  },

  selectMajorDetailByid: async ID => {
    let {
      major_name,
      major_level_one_code,
      major_category_code,
      id
    } = await majorDao.selectMajorNameById(ID);

    let majorLevelOne = await majorDao.selectMajorLevelOneName(
      major_level_one_code
    );
    let majorLevelOneName = majorLevelOne.name;

    let majorCategory = await majorDao.selectMajorCategoryName(
      major_category_code
    );
    let majorCategoryName = majorCategory.name;

    let {
      major_intro,
      study_threshold,
      main_course,
      postgraduate_intro,
      graduate_destination
    } = await majorDao.selectMajorIntroById(id);

    let { education_system } = await majorDao.selectMajorSystemById(id);

    return {
      major_name,
      majorLevelOneName,
      majorCategoryName,
      major_intro,
      study_threshold,
      main_course,
      postgraduate_intro,
      graduate_destination,
      education_system
    };
  }
};
