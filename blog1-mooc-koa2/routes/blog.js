const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/', async (ctx, next) => {
  ctx.body = {
    name: 'longjincen'
  }
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
