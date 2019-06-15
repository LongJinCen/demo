const handleBlogRouter = (req, res) => {
    // 获取博客列表
    if(req.method === 'get' && req.path === '/api/blog/list') {
        return {
            msg: '获取博客列表'
        }
    }
    // 获取博客详细
    if(req.method === 'get' && req.path === '/api/blog/detail') {
        return {
            msg: '获取博客详细'
        }
    }
    // 新建一篇博客
    if(req.method === 'post' && req.path === '/api/blog/new') {
        return {
            msg: '新建一篇博客'
        }
    }
    // 更新一篇博客
    if(req.method === 'post' && req.path === '/api/blog/update') {
        return {
            msg: '更新一篇博客'
        }
    }
    // 删除一篇博客
    if(req.method === 'post' && req.path === '/api/blog/del') {
        return {
            msg: '删除一篇博客'
        }
    }
}

module.exports = handleBlogRouter