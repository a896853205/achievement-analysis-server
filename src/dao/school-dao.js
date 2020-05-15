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
        examYear - 3,
      ])
    );

    return initSchool(schoolList);
  },

  // 通过批次id和学校名查询学校
  querySchoolByLotIdAndNameAndAccountCategory: async (
    lotId,
    schoolName,
    accountCategory,
    examYear
  ) => {
    let schoolList = await db.query(
      new SqlObject(schoolMapper.querySchoolByLotIdAndNameAndAccountCategory, [
        lotId,
        `%${schoolName}%`,
        accountCategory,
        examYear,
        examYear - 1,
        examYear - 2,
        examYear - 3,
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
  queryMajorBySchoolId: async (schoolId, lotId, examYear, accountCategory) => {
    let majorList = await db.query(
      new SqlObject(schoolMapper.getMajorBySchoolId, [
        schoolId,
        lotId,
        examYear,
        examYear - 1,
        examYear - 2,
        examYear - 3,
        accountCategory,
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
          year - 3,
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
      oldThreeRank,
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
          accountCategory,
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
      oldThreeLotsScore,
    };
  },

  // 根据年份查询所有分数和对应位次
  queryLotsScoreByCurrentYear: async (year, accountCategory) => {
    return await db.query(
      new SqlObject(schoolMapper.queryLotsScoreByCurrentYear, [
        year,
        accountCategory,
      ])
    );
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

    return schoolProperty[0];
  },

  // 查询学校的基础信息
  selectSchoolBasicInfo: async id => {
    let schoolInfo = await db.query(
      new SqlObject(schoolMapper.selectSchoolBasicInfo, [id])
    );

    return schoolInfo[0];
  },

  // 使用入学id查询优化专业码
  selectDisciplineCodeByVoluntaryInfo: async ({
    uuid,
    fk_five_volunteer_id,
    major_index,
  }) => {
    return (
      await db.query(
        new SqlObject(schoolMapper.selectDisciplineCodeByVoluntaryInfo, [
          uuid,
          fk_five_volunteer_id,
          major_index,
        ])
      )
    )[0];
  },

  // 查询专业未来前景
  selectMajorFuture: async ({ analysisId, disciplineCode }) => {
    return (
      await db.query(
        new SqlObject(schoolMapper.selectMajorFuture, [
          analysisId,
          disciplineCode,
        ])
      )
    )[0];
  },

  querySchoolScores: async (fk_school_id, accountCategory) => {
    return await db.query(
      new SqlObject(schoolMapper.querySchoolScores, [
        fk_school_id,
        accountCategory
      ])
    );
  },

  selectSchoolLots: async id => {
    return await db.query(new SqlObject(schoolMapper.selectSchoolLots, [id]));
  },

  selectSchoolEnrollmentGuideNewsById: async fk_school_id => {
    return await db.query(
      new SqlObject(schoolMapper.selectSchoolEnrollmentGuideNewsById, [
        fk_school_id,
      ])
    );
  },
  /**
   * 根据id查询学校排名
   */
  selectSchoolRankById: async id => {
    return (
      await db.query(new SqlObject(schoolMapper.selectSchoolRankById, [id]))
    )[0];
  },
  /**
   * 通过
   */
  selectEnrollmentGuideNewsDetail: async guideNewsUuid => {
    return (
      await db.query(
        new SqlObject(schoolMapper.selectEnrollmentGuideNewsDetail, [
          guideNewsUuid,
        ])
      )
    )[0];
  },
  updateAddEnrollmentGuideViews: async enrollmentGuideNewsUuid => {
    return (
      await db.query(
        new SqlObject(schoolMapper.updateAddEnrollmentGuideViews, [
          enrollmentGuideNewsUuid,
        ])
      )
    )[0];
  },

  querySchoolAll: async schoolName => {
    // new SqlObject(schoolMapper.querySchool, [`%${schoolName}%`])
    return await db.query(
      new SqlObject(schoolMapper.querySchoolAll, [`%${schoolName}%`])
    );
  },
  querySchoolPropertyIdById: async fk_school_id => {
    return await db.query(
      new SqlObject(schoolMapper.querySchoolPropertyIdById, [fk_school_id])
    );
  },
  selectSchoolProperty: async () => {
    return await db.query(new SqlObject(schoolMapper.selectSchoolProperty));
  },
  selectSchoolNature: async () => {
    return await db.query(new SqlObject(schoolMapper.selectSchoolNatureById));
  },
  querySchoolRecommend: async () => {
    return await db.query(new SqlObject(schoolMapper.querySchoolRecommend));
  },
};
