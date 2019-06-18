var express = require('express');
var router = express.Router();
const { SuccessModule, ErrorModule } = require('../moudle/resModule.js')
const { login } = require('../controller/user.js')

/* GET users listing. */
router.post('/login', function (req, res, next) {
  const { username, password } = req.body
  login(username, password).then(result => {
    if (result) {
      req.session.username = username
      req.session.password = password
      res.json(new SuccessModule('登陆成功'))
      return
    }
    res.json(new ErrorModule('登陆失败'))
  })
});

module.exports = router;
