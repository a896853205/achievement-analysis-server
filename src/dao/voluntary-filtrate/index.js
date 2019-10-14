export const initVoluntaryOption = originalVoluntaryList => {
  let voluntaryList = [];

  /**
   * 1	华东师范大学	2	金融学类
     2	北京理工大学	3	经济管理试验班
     3	中南大学	2	金融学类
     4	北京科技大学	2	工科试验班类
     5	北京工业大学	3	英语
  */
  for (let item of originalVoluntaryList) {
    // 如果有了就下一个
    if (
      voluntaryList.find(
        findItem => findItem.value === item.fk_five_volunteer_id
      )
    ) {
      continue;
    }

    let majorList = originalVoluntaryList.filter(filterItem =>
      item.fk_five_volunteer_id === filterItem.fk_five_volunteer_id
    );

    let majorListOption = majorList.map(mapItem => {
      return {
        value: mapItem.major_index,
        label: mapItem.major_name
      };
    });

    // 将学校插入第一级中
    voluntaryList.push({
      value: item.fk_five_volunteer_id,
      label: item.name,
      children: majorListOption || []
    });
  }
  return voluntaryList;
};
