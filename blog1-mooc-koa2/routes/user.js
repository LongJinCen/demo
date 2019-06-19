const router = require('koa-router')()

router.prefix('/api/user')

router.get('/login', function (ctx, next) {
  ctx.session.name = 'longjincen'
  ctx.body = {
    session: ctx.session
  }
})

module.exports = router
