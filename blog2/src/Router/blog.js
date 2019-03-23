const { getBlogSingle, getBlogList, createBlogSingle, deleteBlogSingle, updateBlogSingle } = require('../service/blog')
const { URL } = require('url')
const { response } = require('../utils/response')
 
function router(req, res) {
  const { url, headers, method } = req
  const urlObj = new URL('http://' + headers.host + url)
  const pathname = urlObj.pathname.toLocaleLowerCase()
  switch (pathname) {
    // 查询单条
    case '/api/blog':
      getBlogSingle(urlObj, req).then(result => {
        const { id, title, content } = result
        let data = {}
        let msg = 'not found'
        if (result !== 'not found') {
          data = { id, title, content }
          msg = 'success'
        }
        response(res, {
          statusCode: 200,
          code: 0,
          msg,
          data
        })
      })
      break;
    //查询列表
    case '/api/blog_list':
      getBlogList(urlObj, req).then(result => {
        const { count, rows } = result
        response(res, {
          statusCode: 200,
          code: 0,
          msg: 'success',
          data: {
            count,
            list: rows
          }
        })
      })
    break;
    //创建一条数据
    case '/api/blog_create':
      req.on('data',function (chunck) {
        const jsonData = chunck.toString()
        const data = JSON.parse(jsonData)
        createBlogSingle(urlObj, req, data).then(result => {
          const { id, content, title } = result
          response(res, {
            statusCode: 200,
            code: 0,
            msg: 'success',
            data: {
              id
            }
          })
        }).catch((err) => {
          response(res, {
            statusCode: 404,
            code: 1,
            msg: err,
          })
        })
      })
    break;
    //删除一条数据
    case '/api/blog_delete':
      req.on('data', function (chunck) {
        const jsonData = chunck.toString()
        const data = JSON.parse(jsonData)
        deleteBlogSingle(urlObj, req, data).then(() => {
          response(res, {
            statusCode: 200,
            code: 0,
            msg: 'success',
            data: {
              id: data.id
            }
          })
        }).catch((err) => {
          response(res, {
            statusCode: 404,
            code: 1,
            msg: err,
          })
        })
      })
    break;
    //更新一条数据
    case '/api/blog_update':
      req.on('data', function (chunck) {
        const jsonData = chunck.toString()
        const data = JSON.parse(jsonData)
        updateBlogSingle(urlObj, req, data).then(() => {
          response(res, {
            statusCode: 200,
            code: 0,
            msg: 'success',
            data: {
              id: data.id
            }
          })
        })
      })
    break;
    default:
      break;
  }
}

module.exports = {
  router
}