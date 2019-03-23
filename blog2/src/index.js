const http = require('http')
const { router } = require('./Router/blog')

const server = http.createServer(function (req, res) {
  router(req, res)
})

server.listen(3000, 'localhost', function () {
  console.log('监听地址: http://localhost:3000')
})


