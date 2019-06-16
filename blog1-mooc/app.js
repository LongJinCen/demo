const handleBlogRouter = require('./src/router/blog.js')
const handleUserRouter = require('./src/router/user.js')
const querystring = require('querystring')

function getExpireDate() {
    const time = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
    return new Date(time)
}

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

let SESSION_DATA = {}

const serverHandle = (req, res) => {
    req.method = req.method.toLocaleLowerCase(),
        req.path = req.url.split('?')[0],
        req.query = querystring.parse(req.url.split('?')[1]);

    // 接收 post data
    getPostData(req, res).then((postData) => {

        // 设置 body
        req.body = postData

        // 设置 cookies
        req.cookies = {}

        req.headers.cookies.split(';').forEach(v => {
            const result = v.split('=')
            req.cookies[result[0].trim()] = result[1].trim()
        });

        // 解析 session 
        let needSetCookie = false,
            userId = req.cookies.userId;
        if(userId) {
            if(!SESSION_DATA[userId]) {
                SESSION_DATA[userId] = {}
            }
        } else {
            needSetCookie = true
            userId = `${Date.now()}_${Math.random()}`
            SESSION_DATA[userId] = {}
        }
        req.session = SESSION_DATA[userId]

        // 设置响应头
        res.setHeader('Content-type', 'application/json')
        // 命中 blog 路由
        const blogData = handleBlogRouter(req, res)
        if (blogData) {
            blogData.then(data => {
                if(needSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId};path=/;httpOnly;Expires=${getExpireDate()};`)
                }
                res.end(
                    JSON.stringify(data)
                )
            })
            return
        }
        // 命中 user 路由
        const userData = handleUserRouter(req, res)
        if (userData) {
            userData.then(data => {
                if(needSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId};path=/;httpOnly;Expires=${getExpireDate()};`)
                }
                res.end(
                    JSON.stringify(data)
                )
            })
            return
        }
        // 未命中任何路由
        res.writeHead(404, { 'Content-type': 'text/plain' })
        res.end('404 Not Found\n')
    })
}

module.exports = serverHandle