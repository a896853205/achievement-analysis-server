// 查询多条要用query开头,单条用select命名

export default {
  // insert: 'insert into equip(uuid, name, money, des, importance) values(?, ?, ?, ?, ?)',
  // deleteById: 'delete from equip where uuid = ?',
  update: `update t_user set nickname=?, gender=?,phone=?,email=?,score=?, accountCategory=?, provinceCode = ?, cityCode = ?, areaCode = ?, examYear=? where uuid=?`,
  updateBasicInfo: `
    UPDATE
    t_user
    SET
    nickname = ?, phone = ?, email = ?, provinceCode = ?, cityCode = ?, areaCode = ?
    WHERE
    uuid = ?
  `,
  updateImportInfo: `
    UPDATE
    t_user
    SET
    examYear = ?, gender = ?, accountCategory = ?, score = ?
    WHERE
    uuid = ?
  `,
  selectByUuid: `
    SELECT
    t_user.*,
    sys_t_province.name as provinceName,
    sys_t_city.name as cityName,
    sys_t_area.name as areaName
    FROM
    t_user,sys_t_province,sys_t_city,sys_t_area
    WHERE
    t_user.uuid = ?
    AND
    t_user.provinceCode = sys_t_province.code
    AND
    t_user.cityCode = sys_t_city.code
    AND
    t_user.areaCode = sys_t_area.code
    `,
  selectByUserName: `
  SELECT
  t_user.*,
  sys_t_province.name as provinceName,
  sys_t_city.name as cityName,
  sys_t_area.name as areaName
  FROM
  t_user,sys_t_province,sys_t_city,sys_t_area
  WHERE
  t_user.username = ?
  AND
  t_user.provinceCode = sys_t_province.code
  AND
  t_user.cityCode = sys_t_city.code
  AND
  t_user.areaCode = sys_t_area.code
  `, // 通过用户名查询用户
  updatePassword: `
    update
    t_user
    set
    password=?
    where
    uuid=?
  `,
  updateSimulatedCount: `
    update
    t_user
    set
    simulatedCount=?
    where
    uuid=?
  `,
  // query: 'select * from equip where importance > 0 order by importance desc',
  saveUser: `insert into t_user (username,password,uuid)  values (?,?,?)`
};
