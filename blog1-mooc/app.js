const handleBlogRouter = require('./src/router/blog.js')
const handleUserRouter = require('./src/router/user.js')
const querystring = require('querystring')
const { set, get } = require('./src/db/redis')
const { access } = require('./src/util/log')

function getExpireDate() {
    const time = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
    return new Date(time)
}

const getPostData = (req, res) => {
    access(`${req.method}---${req.url}---${req.headers['user-agent']}---${new Date()}`)
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

        // 设置 cookies
        req.cookies = {}
        if(req.headers.cookie) {
            const cookie_arr = req.headers.cookie.split(';')
            cookie_arr.forEach(v => {
                const result = v.split('=')
                req.cookies[result[0].trim()] = result[1].trim()
            });
        }
        // 解析 session
        let needSetCookie = false,
            userId = req.cookies.userId;
        if(userId) {
            get(userId).then(replay => {
                if(replay === null) {
                    set(userId, {})
                    return
                }
            })
        } else {
            needSetCookie = true
            userId = `${Date.now()}_${Math.random()}`
            set(userId, {})
        }
        get(userId).then(replay => {
            req.session = replay
        })
        req.userId = userId

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