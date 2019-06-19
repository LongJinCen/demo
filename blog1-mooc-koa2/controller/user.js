const { exec, escape } = require('../db/mysql')
const { getPassword } = require('../util/crypto')

const login = async (username, password) => {
    username = escape(username)
    password = getPassword(escape(password))
    const sql = `select username, realname from users where username=${username} and password='${password}';`
    const rows = await exec(sql)
    if(rows[0] && rows[0].username) {
        return rows[0]
    }
    return false
}
module.exports = {
    login
}