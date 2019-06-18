const crypto = require('crypto');

const SECRET_KEY = 'abcdefg';

function md5(content) {
    let md5 = crypto.createHash('md5', SECRET_KEY)
    return md5.update(content).digest('hex')
}

function getPassword(password) {
    return md5(password)
}

console.log(getPassword('12345'))
module.exports = {
    getPassword
}