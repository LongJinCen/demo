const handleUserRouter = (req, res) => {
    const method = req.method.toLocaleLowerCase(),
        path = req.url.split('?')[0],
        query = req.url.split('?')[1];
    // 获取博客列表
    if(method === 'post' && path === '/api/user/login') {

    }
}

module.exports = handleUserRouter