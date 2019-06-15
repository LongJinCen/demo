const handleUserRouter = (req, res) => {
    // 登陆
    if(req.method === 'post' && req.path === '/api/user/login') {
        return {
            msg: '登陆'
        }
    }
}

module.exports = handleUserRouter