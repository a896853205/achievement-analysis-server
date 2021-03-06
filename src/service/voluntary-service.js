import voluntaryDao from '../dao/voluntary-dao';
import systemDao from '../dao/system-dao';
import schoolDao from '../dao/school-dao';

// uuid
import uuid from 'uuid/v1';

import {
  voluntaryCompleteStrategy,
  voluntaryGradedStrategy,
  voluntaryScoreStrategy,
  voluntaryPlanStrategy,
  culDeepId,
  findDeepFatherId
} from './voluntary-filtrate';

export default {
    // 将生成报表次数减少1
    updateReportAlterTimeDrop1: async (reportAlterTime,uuid) => {
        const result = await voluntaryDao.updateReportAlterTimeDrop1(reportAlterTime,uuid);

        return result;
    },
    // 将深度体验次数减少1
    updateDeepAlterTimeDrop1: async (deepAlterTime,uuid) => {
        const result = await voluntaryDao.updateDeepAlterTimeDrop1(deepAlterTime,uuid);

        return result;
    },

  // 根据志愿的uuid，获取志愿表上的每一项学校和专业
  queryVoluntarySchoolAndMajorByVoluntaryUuid: async (voluntaryUuid) => {
    let tempData = await voluntaryDao.queryVoluntarySchoolAndMajorByVoluntaryUuid(voluntaryUuid);
    //处理数据
    const res = tempData.reduce((pre, item) => {
      const temp = pre.find((it) => (it.id === item.fk_five_volunteer_id));
      if (temp) {
          temp.major[item.major_index] = {index: item.major_index, majorName: item.major_name};
      } else {
          const baseMajor = Array(6).fill({index: '', majorName: ''});
          baseMajor[item.major_index] = {index: item.major_index, majorName: item.major_name};
          const baseInfo = {
            fk_five_volunteer_id: item.fk_five_volunteer_id,
            name: item.name,
            id: item.id,
            volunteer_name:item.volunteer_name,
          }
          pre.push(Object.assign({}, baseInfo, {major: baseMajor}))
      }
      return pre
    }, []);

    return res;
  },

    getLotIdByVoluntaryUuid: async ( voluntaryUuid ) => {
        const data = await voluntaryDao.getLotIdByVoluntaryUuid(voluntaryUuid);

        return data;
    },
  // 保存志愿信息
  saveVoluntary: async (lotId, voluntary, user, reportType) => {
    let voluntaryUuid = uuid();
      // console.log(voluntary[0], 666666);
    if (user.reportAlterTime > 0) {
      let allParam = [];

      for (let schoolOption of voluntary) {
        if (schoolOption && schoolOption.major) {
          schoolOption.major.forEach((majorOption, majorIndex) => {
            if (majorOption.majorId) {
              let param = [];

              param.push(
                voluntaryUuid,
                schoolOption.five_volunteer_id,
                schoolOption.schoolId,
                majorOption.majorId,
                majorIndex,
                new Date(),
                  schoolOption.lot_id,
                user.uuid,
                schoolOption.gender,
                // 因为查询的是年份的year
                user.examYear,
                // user.poverty,
                schoolOption.gather,
                reportType,
                  user.accountCategory
              );

              allParam.push(param);
            }
          });
        }
      }

      // 没有填写志愿
      if (!allParam.length) {
        return -1;
      }

        // console.log(allParam, 4444444444);
      await voluntaryDao.saveVoluntary(allParam, user, reportType);
    } else {
      // 没有次数了
      return 0;
    }

    // 一切正确,token生成
    return voluntaryUuid;
  },

    culVoluntaryResult: async voluntaryUuid => {
        let result = {
            submitTime: undefined,
            lotsName: undefined,
            // 完整性结果，志愿选择完备性
            completeResult: {
                reasonable: false,
                describe: '',
                unWriteDetailArr: []
            },
            // 梯度合理性
            gradedResult: {
                reasonable: false,
                describe: '',
                gradedDetailArr: [],
                schoolScoreArr: [],
                maxAndMin: {}

            },
            // 大计划合理性
            planResult: {
                reasonable: false,
                describe: '',
                planDetailArr: []
            }
        };
        // 这里计算结果
        let [voluntaryList, gatherOptionList] = await Promise.all([
            voluntaryDao.queryVoluntaryResult(voluntaryUuid),
            systemDao.queryGatherOption()
        ]);
        let volunteerCount = await systemDao.queryVolunteerCountByLotId(voluntaryList[0].fk_lots_id === 6 ? 4 : voluntaryList[0].fk_lots_id);

        // 对gather进行一下适配处理
        let gatherOption = {};
        gatherOptionList.forEach(item => {
            gatherOption[item.value] = item.name;
        });

        if (voluntaryList.length) {
            // 如果有志愿
            // 将志愿的基本信息保存到返回对象中
            result.submitTime = voluntaryList[0].submit_time;
            result.lotsName = voluntaryList[0].lots_name === '三批' ? '二批A' : voluntaryList[0].lots_name;

            // 第一项判断完备性，判断志愿选择完备性
            let unWriteDetailArr = voluntaryCompleteStrategy[
                voluntaryList[0].fk_lots_id === 6 ? 4 : voluntaryList[0].fk_lots_id
                ](voluntaryList);

            if (unWriteDetailArr.length) {
                result.completeResult.unWriteDetailArr = unWriteDetailArr;
                result.completeResult.describe =
                    '请考生完整填写志愿表，以免造成滑档情况！';
                result.completeResult.reasonable = false;
            } else {
                result.completeResult.describe =
                    '志愿完备性合理，如果您另外的条件均合理，则恭喜您可以按照该志愿填报了，祝您金榜题名！';
                result.completeResult.reasonable = true;
            }

            // 第二项判断梯度合理性
            let gradedAnalyzeResult = voluntaryGradedStrategy[
                voluntaryList[0].fk_lots_id === 6 ? 4 : voluntaryList[0].fk_lots_id
                ](voluntaryList, gatherOption, volunteerCount);

            result.gradedResult.schoolScoreArr = gradedAnalyzeResult.schoolScoreArr;
            result.gradedResult.maxAndMin = gradedAnalyzeResult.maxAndMin;

            if (gradedAnalyzeResult.gradeDetailArr.length) {
                result.gradedResult.gradedDetailArr = gradedAnalyzeResult.gradeDetailArr;
                result.gradedResult.describe =
                    '如按此方式填报会造成滑档情况，考生请谨慎选择！';
                result.gradedResult.reasonable = false;
            } else {
                result.gradedResult.describe =
                    '志愿梯度性合理，如果您另外的条件均合理，则恭喜您可以按照该志愿填报了，祝您金榜题名！';
                result.gradedResult.reasonable = true;
            }

            // 第三项判断大计划性
            result.planResult.planDetailArr = voluntaryPlanStrategy[
                voluntaryList[0].fk_lots_id === 6 ? 4 : voluntaryList[0].fk_lots_id
                ](voluntaryList, volunteerCount);

            if (result.planResult.planDetailArr.length) {
                result.planResult.reasonable = false;
                result.planResult.describe = `请考生谨慎选择，以免造成退档或滑档情况！`;
            } else {
                result.planResult.describe =
                    '志愿大计划选择合理性，如果您另外的条件均合理，则恭喜您可以按照该志愿填报了，祝您金榜题名！';
                result.planResult.reasonable = true;
            }
        }

        return result;
    },

    /**
     * 计算深度体验报告
     */
    culVoluntaryDeepResult: async (voluntaryUuid, voluntarieerId, majorIndex) => {
        // 查询school_id
        let voluntary = await voluntaryDao.selectVoluntaryResultByVolunteerAndMajorIndex(
            voluntaryUuid,
            voluntarieerId,
            majorIndex
        );
        // 通过voluntary查询 层次,类别,类型,属性,排名
        let [
            lotData,
            schoolTypeData,
            schoolPropertyData,
            schoolInfo
        ] = await Promise.all([
            systemDao.selectLotById(voluntary.fk_lots_id),
            schoolDao.selectSchoolType(voluntary.fk_school_id),
            schoolDao.selectSchoolProperty(voluntary.fk_school_id),
            schoolDao.selectSchoolBasicInfo(voluntary.fk_school_id)
        ]);

        let arrangement, nature, type, property, rank;

        if (lotData) arrangement = lotData.gradation;
        if (schoolInfo) nature = +schoolInfo.fk_nature_id;
        if (schoolTypeData) type = +schoolTypeData.id;
        if (schoolPropertyData) property = +schoolPropertyData.id;
        if (schoolInfo) rank = +schoolInfo.rank;

        let analysisId = culDeepId(arrangement, nature, type, property, rank);
        let unitSatisfactionObj = await systemDao.selectUnitSatisfaction(
            analysisId
        );

        let disciplineCode = await schoolDao.selectDisciplineCodeByVoluntaryInfo({
            uuid: voluntaryUuid,
            fk_five_volunteer_id: voluntarieerId,
            major_index: majorIndex
        });

        if (!disciplineCode) {
            return {
                unitSatisfactionObj
            };
        }

        // 专业的id找专业优化code, 这个专业优化code和deepId一起查询派遣库的数据
        let majorFutureObj = null;
        do {
            majorFutureObj = await schoolDao.selectMajorFuture({
                analysisId,
                disciplineCode: disciplineCode.code
            });

            // 查找父级id
            analysisId = findDeepFatherId(analysisId);
        } while (!majorFutureObj);

        // 没有code数据就不查
        // 使用deepId查询两张表查出对应数据发给前台
        return {
            unitSatisfactionObj,
            majorFutureObj
        };
    },

  /**
   * 通过用户uuid查询志愿情况
   */
  queryVoluntaryList: async userUuid => {
    return await voluntaryDao.queryVoluntaryByUserUuid(userUuid);
  },

  // 通过志愿表的uuid查询志愿情况
  queryVoluntaryListByVoluntaryUuid: async voluntaryUuid => {
    return await voluntaryDao.queryVoluntaryListByVoluntaryUuid(voluntaryUuid);
  },

  saveTempVoluntary: async (voluntary, userUuid) => {
    return await voluntaryDao.saveTempVoluntary(
      JSON.stringify(voluntary),
      userUuid
    );
  },

  selectTempVoluntary: async userUuid => {
    let voluntaryObj = await voluntaryDao.selectTempVoluntary(userUuid);

    if (voluntaryObj) {
      return JSON.parse(voluntaryObj.voluntaryStr);
    } else {
      return null;
    }
  }
};
