const { exec } = require('../db/mysql')

const login = (username, password) => {
    const sql = `select username, realname from users where username='${username}' and password='${password}';`
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