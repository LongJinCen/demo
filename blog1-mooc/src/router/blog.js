const { SuccessModule, ErrorModule } = require('../moudle/resModule.js')
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog.js')

const handleBlogRouter = (req, res) => {
    const id = req.query.id
    // 获取博客列表
    if (req.method === 'get' && req.path === '/api/blog/list') {
        const author = req.query.author || '',
            keyword = req.query.keyword || '';
        const listData = getList(author, keyword)
        return new SuccessModule(listData)
    }
    // 获取博客详细
    if (req.method === 'get' && req.path === '/api/blog/detail') {
        const data = getDetail(id)
        return new SuccessModule(data)
    }
    // 新建一篇博客
    if (req.method === 'post' && req.path === '/api/blog/new') {
        const data = newBlog(req.body)
        return new SuccessModule(data, '创建成功')
    }
    // 更新一篇博客
    if (req.method === 'post' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        if (result) {
            return new SuccessModule('更新成功')
        }
        return new ErrorModule('更新失败')
    }
    // 删除一篇博客
    if (req.method === 'post' && req.path === '/api/blog/del') {
        const result = delBlog(id)
        if (result) {
            return new SuccessModule('删除成功')
        }
        return new ErrorModule('删除失败')
    }
}

module.exports = handleBlogRouter