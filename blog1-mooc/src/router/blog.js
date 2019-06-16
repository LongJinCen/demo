const { SuccessModule, ErrorModule } = require('../moudle/resModule.js')
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog.js')

// 登陆验证

function loginCheck(req) {
    if(!req.session.username) {
        return Promise.resolve(
            new ErrorModule('尚未登陆')
        )
    }
}

const handleBlogRouter = (req, res) => {
    // 获取博客列表
    if (req.method === 'get' && req.path === '/api/blog/list') {
        const author = req.query.author || '',
            keyword = req.query.keyword || '';
        return getList(author, keyword).then(listData => {
            return new SuccessModule(listData)
        })
    }
    // 获取博客详细
    if (req.method === 'get' && req.path === '/api/blog/detail') {
        const id = req.query.id
        return getDetail(id).then(data => {
            return new SuccessModule(data)
        })
    }
    // 新建一篇博客
    if (req.method === 'post' && req.path === '/api/blog/new') {
        const loginCheckResult = loginCheck()
        if(loginCheckResult) {
            return loginCheckResult
        }
        req.author = req.session.author
        return newBlog(req, req.body).then(data => {
            return new SuccessModule(data, '创建成功')
        })
    }
    // 更新一篇博客
    if (req.method === 'post' && req.path === '/api/blog/update') {
        const loginCheckResult = loginCheck()
        if(loginCheckResult) {
            return loginCheckResult
        }
        return updateBlog(req.body).then(result => {
            if (result) {
                return new SuccessModule('更新成功')
            }
            return new ErrorModule('更新失败')
        })
    }
    // 删除一篇博客
    if (req.method === 'post' && req.path === '/api/blog/del') {
        const loginCheckResult = loginCheck()
        if(loginCheckResult) {
            return loginCheckResult
        }
        req.author = req.session.author
        return delBlog(req).then(result => {
            if (result) {
                return new SuccessModule('删除成功')
            }
            return new ErrorModule('删除失败')
        })
    }
}

module.exports = handleBlogRouter