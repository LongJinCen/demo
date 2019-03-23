const http = require('http')
const { URL } = require('url')
const querystring = require('querystring')
const { blog, handleSideBarMenu } = require('./blog')

const server = http.createServer(function (req, res) {
  const { url, method, headers } = req
  const urlObj = new URL("http://" + headers.host + url)
  switch(urlObj.pathname) {
    case '/blog':
      const id = urlObj.searchParams.get('id')
      blog(id).then((data) => {
        res.writeHead(200, 'ok', {
          'content-type': 'text/plain;charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        })
        res.write(data, 'utf8')
        res.end()
      }).catch((err) => {
        res.writeHead(err.code, err.message, {
          'content-type': 'text/plain',
          'Access-Control-Allow-Origin': '*'
        })
        res.end()
      })
      break;
    case '/blogMenu':
      handleSideBarMenu().then((files) => {
        res.writeHead(200, 'ok', {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
        res.write(JSON.stringify(files))
        res.end()
      }).catch((err) => {
        res.writeHead(err.code, err.message, {
          'content-type': 'text/plain',
          'Access-Control-Allow-Origin': '*'
        })
        res.end()
      })
      break;
    default:
      
      break;
  }
})

server.listen(3000, 'localhost', function () {
  console.log('running at http://localhost:3000')
})