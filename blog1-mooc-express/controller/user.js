const { exec, escape } = require('../db/mysql')
const { getPassword } = require('../util/crypto')

const login = (username, password) => {
    username = escape(username)
    password = getPassword(escape(password))
    const sql = `select username, realname from users where username=${username} and password='${password}';`
    return exec(sql).then(rows => {
        if(rows[0] && rows[0].username) {
            
            return true
        }
        return false
    })
}
module.exports = {
    login
}