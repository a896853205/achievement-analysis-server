// 数据库操作
import { db, SqlObject } from '../resources/db-connect';

// 数据库语句
import schoolMapper from '../resources/mapper/school-mapper';

// 处理数据函数
import { initSchool } from './school-filtrate';
import { initMajor } from './major-filrate';

export default {
  // 通过批次id查询学校
  querySchoolByLotIdAndAccountCategory: async (
    lotId,
    accountCategory,
    examYear
  ) => {
    let schoolList = await db.query(
      new SqlObject(schoolMapper.querySchoolByLotIdAndAccountCategory, [
        lotId,
        accountCategory,
        examYear,
        examYear - 1,
        examYear - 2,
        examYear - 3
      ])
    );

    return initSchool(schoolList);
  },

  // 通过批次id和学校名查询学校
  querySchoolByLotIdAndNameAndAccountCategory: async (
    lotId,
    schoolName,
    accountCategory
  ) => {
    let schoolList = await db.query(
      new SqlObject(schoolMapper.querySchoolByLotIdAndNameAndAccountCategory, [
        lotId,
        `%${schoolName}%`,
        accountCategory
      ])
    );

    return initSchool(schoolList);
  },

  querySchoolWithMajorByLotIdAndAccountCategory: async (
    lotId,
    accountCategory
  ) => {
    let originalSchoolList = await db.query(
      new SqlObject(
        schoolMapper.querySchoolWithMajorByLotIdAndAccountCategory,
        [lotId, accountCategory]
      )
    );

    return originalSchoolList;
  },

  // 查询所有学校
  querySchool: async schoolName => {
    let schoolList = await db.query(
      new SqlObject(schoolMapper.querySchool, [`%${schoolName}%`])
    );

    return initSchool(schoolList);
  },

  // 通过学校id和当前年份获取学校
  queryMajorBySchoolId: async (schoolId, lotId, examYear) => {
    let majorList = await db.query(
      new SqlObject(schoolMapper.getMajorBySchoolId, [
        schoolId,
        lotId,
        examYear,
        examYear - 1,
        examYear - 2,
        examYear - 3
      ])
    );

    return initMajor(majorList);
  },

  // 通过考试年份和文科理科来获取分数段
  queryScoreRankByCategoryAndYear: async (accountCategory, year) => {
    let scoreRankList = await db.query(
        new SqlObject(schoolMapper.queryScoreRankByCategoryAndYear, [
          accountCategory,
          year,
          year - 1,
          year - 2,
          year - 3
        ])
      ),
      currentRank = [],
      oldOneRank = [],
      oldTwoRank = [],
      oldThreeRank = [];

    // 对scoreRankList进行处理,处理成四个年份的数组
    for (let scoreRankItem of scoreRankList) {
      if (scoreRankItem.year === year) {
        currentRank.push(scoreRankItem);
      } else if (scoreRankItem.year === year - 1) {
        oldOneRank.push(scoreRankItem);
      } else if (scoreRankItem.year === year - 2) {
        oldTwoRank.push(scoreRankItem);
      } else if (scoreRankItem.year === year - 3) {
        oldThreeRank.push(scoreRankItem);
      }
    }

    return {
      currentRank,
      oldRank: oldOneRank,
      oldTwoRank,
      oldThreeRank
    };
  },

  selectSchoolDetail: async schoolId => {
    let schoolDetailList = await db.query(
      new SqlObject(schoolMapper.querySchoolDetail, [schoolId])
    );

    return initSchool(schoolDetailList)[0];
  },

  queryLotsScore: async (examYear, accountCategory) => {
    // 查询去年的lots
    let lotsScoreList = await db.query(
        new SqlObject(schoolMapper.queryLotsScore, [
          examYear,
          examYear - 1,
          examYear - 2,
          examYear - 3,
          accountCategory
        ])
      ),
      currentLotsScore = [],
      oldOneLotsScore = [],
      oldTwoLotsScore = [],
      oldThreeLotsScore = [];

    // 对lotsScoreList进行处理,处理成四个年份的数组
    for (let lotsScoreItem of lotsScoreList) {
      if (lotsScoreItem.year === examYear) {
        currentLotsScore.push(lotsScoreItem);
      } else if (lotsScoreItem.year === examYear - 1) {
        oldOneLotsScore.push(lotsScoreItem);
      } else if (lotsScoreItem.year === examYear - 2) {
        oldTwoLotsScore.push(lotsScoreItem);
      } else if (lotsScoreItem.year === examYear - 3) {
        oldThreeLotsScore.push(lotsScoreItem);
      }
    }

    return {
      currentLotsScore,
      oldOneLotsScore,
      oldTwoLotsScore,
      oldThreeLotsScore
    };
  },

  // 查询学校的类型通过学校id
  selectSchoolType: async id => {
    let schoolTypeList = await db.query(
      new SqlObject(schoolMapper.selectSchoolType, [id])
    );

    if (schoolTypeList) {
      return schoolTypeList[0];
    } else {
      return;
    }
  },

  // 查询学校的属性通过学校id
  selectSchoolProperty: async id => {
    let schoolProperty = await db.query(
      new SqlObject(schoolMapper.selectSchoolProperty, [id])
    );

    if (schoolProperty) {
      return schoolProperty[0];
    } else {
      return;
    }
  },

  // 查询学校的基础信息
  selectSchoolBasicInfo: async id => {
    let schoolInfo = await db.query(
      new SqlObject(schoolMapper.selectSchoolBasicInfo, [id])
    );

    if (schoolInfo) {
      return schoolInfo[0];
    } else {
      return;
    }
  }
};
