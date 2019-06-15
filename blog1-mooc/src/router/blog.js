const handleBlogRouter = (req, res) => {
    const method = req.method.toLocaleLowerCase(),
        path = req.url.split('?')[0],
        query = req.url.split('?')[1];
    // 获取博客列表
    if(method === 'get' && path === '/api/blog/list') {

    }
    // 获取博客详细
    if(method === 'get' && path === '/api/blog/detail') {
        
    }
    // 新建一篇博客
    if(method === 'post' && path === '/api/blog/new') {
        
    }
    // 更新一篇博客
    if(method === 'post' && path === '/api/blog/update') {
        
    }
    // 删除一篇博客
    if(method === 'post' && path === '/api/blog/del') {
        
    }
}

module.exports = handleBlogRouter