// 查询多条要用query开头,单条用select命名

export default {
  // insert: 'insert into equip(uuid, name, money, des, importance) values(?, ?, ?, ?, ?)',
  // deleteById: 'delete from equip where uuid = ?',
  update: `update t_user set nickname=?, gender=?,phone=?,email=?,score=?, accountCategory=?, provinceCode = ?, cityCode = ?, areaCode = ?, examYear=?, scoreAlterTime=?, highSchool=? where uuid=?`,
  updateBasicInfo: `
    UPDATE
    t_user
    SET
    nickname = ?, phone = ?, email = ?, provinceCode = ?, cityCode = ?, areaCode = ?, highSchool = ?
    WHERE
    uuid = ?
  `,
  updateImportInfo: `
    UPDATE
    t_user
    SET
    examYear = ?, gender = ?, accountCategory = ?, score = ?, scoreAlterTime = ?
    WHERE
    uuid = ?
  `,
  selectByUuid: `
  SELECT
    t_user.*,
    sys_t_province.NAME AS provinceName,
    sys_t_city.NAME AS cityName,
    sys_t_area.NAME AS areaName 
  FROM
    t_user
    LEFT JOIN sys_t_province ON t_user.provinceCode = sys_t_province.CODE
    LEFT JOIN sys_t_city ON t_user.cityCode = sys_t_city.CODE
    LEFT JOIN sys_t_area ON t_user.areaCode = sys_t_area.CODE
  WHERE
    t_user.uuid = ?
    `,
  selectByUserName: `
  SELECT
    t_user.*,
    sys_t_province.NAME AS provinceName,
    sys_t_city.NAME AS cityName,
    sys_t_area.NAME AS areaName 
  FROM
    t_user
    LEFT JOIN sys_t_province ON t_user.provinceCode = sys_t_province.CODE
    LEFT JOIN sys_t_city ON t_user.cityCode = sys_t_city.CODE
    LEFT JOIN sys_t_area ON t_user.areaCode = sys_t_area.CODE
  WHERE
    t_user.username = ?
  `, // 通过用户名查询用户
  updatePassword: `
    update
    t_user
    set
    password=?
    where
    uuid=?
  `,
  updateReportAlterTime: `
    update
    t_user
    set
    reportAlterTime=?
    where
    uuid=?
  `,
  updateDeepAlterTime: `
    UPDATE
    t_user
    SET
    deepAlterTime = ?
    WHERE
    uuid = ?
  `,
  // query: 'select * from equip where importance > 0 order by importance desc',
  saveUser: `
  INSERT
  INTO
  t_user
  ( username, password, uuid, roleCode, scoreAlterTime, reportAlterTime, deepAlterTime )
  VALUES
  ( ?, ?, ?, ?, ?, ?, ? )
`
};
