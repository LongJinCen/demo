const { SuccessModule, ErrorModule } = require('../moudle/resModule.js')
const express = require('express')
const router = express.Router()

const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog.js')
router.get('/list', function (req, res, next) {
    const author = req.query.author || '',
        keyword = req.query.keyword || '';
    getList(author, keyword).then(listData => {
        res.json(new SuccessModule(listData))
    })
})

router.get('/detail', function (req, res, next) {
    const id = req.query.id
    getDetail(id).then(data => {
        res.json(new SuccessModule(data))
    })
})

router.post('/new', function (req, res, next) {
    req.author = req.session.author
    newBlog(req, req.body).then(data => {
        res.json(new SuccessModule(data, '创建成功'))
    })
})

router.post('/update', function (req, res, next) {
    updateBlog(req.body).then(result => {
        if (result) {
            res.json(new SuccessModule('更新成功'))
            return
        }
        res.json(new ErrorModule('更新失败'))
    })
})

router.post('/del', function (req, res, next) {
    req.author = req.session.author
    delBlog(req).then(result => {
        if (result) {
            res.json(new SuccessModule('删除成功'))
            return
        }
        res.json(new ErrorModule('删除失败'))
    })
})

module.exports = router