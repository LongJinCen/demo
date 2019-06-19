const { ErrorModule } = require('../moudle/resModule')

module.exports = async (ctx, next) => {
    console.log(ctx.session.username, 'username')
    if(ctx.session.username) {
        await next()
        return
    }
    ctx.body = {
        data: new ErrorModule('未登录')
    }
}