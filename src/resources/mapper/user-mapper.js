// 查询多条要用query开头,单条用select命名

export const userMapper = {
  insert: 'insert into equip(uuid, name, money, des, importance) values(?, ?, ?, ?, ?)',
  deleteById: 'delete from equip where uuid = ?',
  update: 'update equip set name=?, money=?, des=?, importance=? where uuid=?',
  query: 'select * from equip where importance > 0 order by importance desc',
}
