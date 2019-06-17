const { login } = require('../controller/user.js')
const { SuccessModule, ErrorModule } = require('../moudle/resModule.js')
const { set, get } = require('../db/redis')

const handleUserRouter = (req, res) => {
    // 登陆
    if(req.method === 'get' && req.path === '/api/user/login') {
        const { username, password } = req.query
        return login(username, password).then(result => {
            if(result) {
                get(req.userId).then(replay => {
                    replay.username = username
                    replay.password = password
                    set(req.userId, replay)
                })
                return new SuccessModule('登陆成功')
            }
            return new ErrorModule('登陆失败')
        })
    }
}

module.exports = handleUserRouter