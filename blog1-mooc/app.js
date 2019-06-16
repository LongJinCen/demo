const handleBlogRouter = require('./src/router/blog.js')
const handleUserRouter = require('./src/router/user.js')
const querystring = require('querystring')

const getPostData = (req, res) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'post') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', function (chunck) {
            postData += chunck.toString()
        })
        req.on('end', function () {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    req.method = req.method.toLocaleLowerCase(),
        req.path = req.url.split('?')[0],
        req.query = querystring.parse(req.url.split('?')[1]);

    // 接收 post data
    getPostData(req, res).then((postData) => {

        // 设置 body
        req.body = postData
        
        // 设置响应头
        res.setHeader('Content-type', 'application/json')
        // 命中 blog 路由
        const blogData = handleBlogRouter(req, res)
        if (blogData) {
            blogData.then(data => {
                res.end(
                    JSON.stringify(data)
                )
            })
            return
        }
        // 命中 user 路由
        const userData = handleUserRouter(req, res)
        if (userData) {
            res.end(
                JSON.stringify(userData)
            )
            return
        }
        // 未命中任何路由
        res.writeHead(404, { 'Content-type': 'text/plain' })
        res.end('404 Not Found\n')
    })
}

module.exports = serverHandle