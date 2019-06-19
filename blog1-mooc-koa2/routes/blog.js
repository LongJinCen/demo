const router = require('koa-router')()
const { SuccessModule, ErrorModule } = require('../moudle/resModule.js')
const loginCheck = require('../middleware/loginCheck')
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog.js')

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
  const author = ctx.query.author || '',
    keyword = ctx.query.keyword || '';
  const listData = await getList(author, keyword)
  ctx.body = {
    data: new SuccessModule(listData)
  }
})

router.get('/detail', async function (ctx, next) {
  const id = ctx.query.id
  const data = await getDetail(id)
  ctx.body = {
    data: new SuccessModule(data)
  }
})

router.post('/new', loginCheck, async function (ctx, next) {
  ctx.author = ctx.session.author
  const data = await newBlog(ctx, ctx.request.body)
  ctx.body = {
    data: new SuccessModule(data, '创建成功')
  }
})

router.post('/update', loginCheck, async function (ctx, next) {
  const result = await updateBlog(ctx.request.body)
  if (result) {
    ctx.body = {
      data: new SuccessModule('更新成功')
    }
    return
  }
  ctx.body = {
    data: new ErrorModule('更新失败')
  }
})

router.post('/del', loginCheck, async function (ctx, next) {
  ctx.author = ctx.session.author
  const result = delBlog(ctx)
  if (result) {
    ctx.body = {
      data: new SuccessModule('删除成功')
    }
    return
  }
  ctx.body = {
    data: new ErrorModule('删除失败')
  }
})

module.exports = router