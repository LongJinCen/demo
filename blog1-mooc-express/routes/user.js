var express = require('express');
var router = express.Router();
const { SuccessModule, ErrorModule } = require('../moudle/resModule.js')
const { set, get } = require('../db/redis')
const { login } = require('../controller/user.js')

/* GET users listing. */
router.post('/login', function (req, res, next) {
  const { username, password } = req.query
  login(username, password).then(result => {
    if (result) {
      get(req.userId).then(replay => {
        replay.username = username
        replay.password = password
        set(req.userId, replay)
      })
      res.json(new SuccessModule('登陆成功'))
    }
    res.json(new ErrorModule('登陆失败'))
  })
});

module.exports = router;
