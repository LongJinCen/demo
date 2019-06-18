const { ErrorModule } = require('../moudle/resModule')

module.exports = (req, res, next) => {
    if(req.session.username) {
        next()
        return
    }
    res.json(
        new ErrorModule('未登录')
    )
}