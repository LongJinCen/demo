const router = require('koa-router')()
const { SuccessModule, ErrorModule } = require('../moudle/resModule.js')
const { login } = require('../controller/user.js')

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body
  const result = await login(username, password)
  if (result) {
    console.log(result, 'result')
    ctx.session.author = result.realname
    ctx.session.username = result.username
    ctx.body = {
      data: new SuccessModule('登陆成功')
    }
    return
  }
  ctx.body = {
    data: new ErrorModule('登陆失败')
  }
});

module.exports = router
