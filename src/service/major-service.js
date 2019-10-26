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
  }
};
