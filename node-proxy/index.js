const Koa = require('koa');
const proxy = require('http-proxy-middleware');
const c2k = require('koa-connect');
const Router = require('koa-router');
const pathToRegexp = require('path-to-regexp')

const app = new Koa();
const router = new Router();

router.post(/^\/api/, apiProxy)

async function apiProxy(ctx, next) {
    const path = ctx.path
    const newPath = path.replace('/api', '')
    const middleware = c2k(proxy({
        target: 'http://127.0.0.1:3001', // target host
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
            [path]: newPath
        },
    }))
    return await middleware(ctx, next)
}
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);