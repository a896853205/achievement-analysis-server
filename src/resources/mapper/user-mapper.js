// 查询多条要用query开头,单条用select命名

export default {
	// insert: 'insert into equip(uuid, name, money, des, importance) values(?, ?, ?, ?, ?)',
	// deleteById: 'delete from equip where uuid = ?',
	update:
		'update t_user set nickname=?, gender=?, score=?, accountCategory=?, addressProvince=?, examYear=? where uuid=?',
	selectByUuid: 'select * from t_user where uuid=?',
	selectByUserName: 'select * from t_user where username=?', // 通过用户名查询用户
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
