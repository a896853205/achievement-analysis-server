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
  }
};
