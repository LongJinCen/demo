const { ip } = require('../config/ip')

function createURL(url) {
  formatTest(url)
  var ipEndChar = ip.charAt(ip.length - 1)
  if (ipEndChar === '/' ) {
    ip[ip.length - 1] = ''
  }
  return ip + url
}

function formatTest(url) {
  var reg = /^(\/\w*)*$/
  var formatTestResult = reg.test(url)
  if (!formatTestResult) {
    throw 'the url format is incorrect, it should like this /xx/xx...'
  }
}


module.exports = {
  createURL
}