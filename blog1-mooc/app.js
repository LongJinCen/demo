const handleBlogRouter = require('./src/router/blog.js')
const handleUserRouter = require('./src/router/user.js')

const serverHandle = (req, res) => {
    req.method = req.method.toLocaleLowerCase(),
    req.path = req.url.split('?')[0],
    req.query = req.url.split('?')[1];
    // 设置响应头
    res.setHeader('Content-type', 'application/json')
    // 命中 blog 路由
    const blogData = handleBlogRouter(req, res)
    if(blogData) {
        res.end(
            JSON.stringify(blogData)
        )
        return
    }
    // 命中 user 路由
    const userData = handleUserRouter(req, res)
    if(userData) {
        res.end(
            JSON.stringify(userData)
        )
        return
    }
    // 未命中任何路由
    res.writeHead(404, { 'Content-type': 'text/plain'})
    res.end('404 Not Found\n')
}

module.exports = serverHandle