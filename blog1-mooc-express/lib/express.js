const http = require('http')
const slice = Array.prototype.slice

class express {
    constructor() {
        this.routes = {
            all: [],
            get: [],
            post: []
        }
    }
    register (path) {
        const info = {}
        if(typeof path === 'string') {
            info.path = path
            info.stack = slice.apply(arguments, 1)
        } else {
            info.path = '/'
            info.stack = slice.apply(arguments, 0)
        }
        return info
    }
    use () {
        const info = this.register.apply(this, arguments)
        this.all.push(info)
    }
    get () {
        const info = this.register.apply(this, arguments)
        this.get.push(info)
    }
    post () {
        const info = this.register.apply(this, arguments)
        this.post.push(info)
    }
    match (url, method) {
        let stack = []
        if(url === '/favicon.ico') {
            return stack
        }
        const curRoutes = this.routes.all.concat(this.routes[method])

        curRoutes.forEach(curInfo => {
            if(url.indexOf(curInfo.path) === 0) {
                stack = stack.concat(curInfo.stack)
            }
        })
        return stack
    }
    handle (req, res, stack) {
        const next = () => {
            const middleware = stack.shift()
            if(middleware) {
                middleware(req, res, next)
            }
        }
        next()
    }
    callBack () {
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json')
                res.end(
                    JSON.stringify(data)
                )
            }
            const url = req.url
            const method = url.method.toLowerCase()

            const resultList = this.match(url, method)
            this.handle(req, res, resultList)
        }
    }
    listen() {
        const server = http.createServer(this.callBack())
        server.listen(...arguments)
    }
}

module.exports = express