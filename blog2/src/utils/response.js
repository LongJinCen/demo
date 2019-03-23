
function response(res, option) {
  const { statusCode, code, msg, data } = option
  res.writeHead(statusCode, {
    'content-type': 'application/json'
  })
  res.write(JSON.stringify({
    code,
    msg,
    data
  }))
  res.end()
}

module.exports = {
  response
}