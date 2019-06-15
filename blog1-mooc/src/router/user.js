const { login } = require('../controller/user.js')
const { SuccessModule, ErrorModule } = require('../moudle/resModule.js')

const handleUserRouter = (req, res) => {
    // 登陆
    if(req.method === 'post' && req.path === '/api/user/login') {
        const { username, password } = req.body
        const result = login(username, password)
        if(result) {
            return new SuccessModule('登陆成功')
        }
        return new ErrorModule('登陆失败')
    }
}

module.exports = handleUserRouter