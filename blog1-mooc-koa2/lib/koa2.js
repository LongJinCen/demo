const http = require('http')

function compose(middlewareList) {
    return function (ctx) {
        function dispatch(i) {
            const middleware = middlewareList[i]
            try {
                return Promise.resolve(
                    middleware(ctx, dispatch.bind(null, i + 1))
                )
            } catch (error) {
                return Promise.reject(error)
            }
        }
        return dispatch(0)
    }
}

class koa2 {
    constructor() {
        this.middlewareList = []
    }
    use(fn) {
        this.middlewareList.push(fn)
        return this
    }
    createCtx(req, res) {
        const ctx = {
            req,
            res
        }
        return ctx
    }
    callBack() {
        const fn = compose(this.middlewareList)
        return (req, res) => {
            const ctx = this.createCtx(req, res)
            return fn(ctx)
        }
    }
    listen() {
        const server = http.createServer(this.callBack())
        server.listen(...arguments)
    }
}

return koa2