const { request } = require('../utlils/request')
const { createURL } = require('../utlils/index')
const { basic } = require('../config/url')

function get(body = {}) {
  return request(createURL(basic), {
    method: 'get',
    params: body
  })
}

function post(body = {}) {
  return request(createURL(basic), {
    method: 'post',
    params: body
  })
}

function put(body = {}) {
  return request(createURL(basic),{
    method: 'put',
    params: body
  })
}

function _delete(body = {}) {
  return request(createURL(basic),{
    method: 'delete',
    params: body
  })
}

function head(body = {}) {
  return request(createURL(basic),{
    method: 'head',
    params: body
  })
}

module.exports = {
  get,
  post,
  put,
  _delete,
  head
}
