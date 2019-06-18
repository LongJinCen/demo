const { exec } = require('../db/mysql')
const xss = require('xss')

const getList = (author, keyword) => {
    let sql = 'select * from blogs where 1=1 '
    if(author) {
        sql += `and author='${author}' `
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += 'order by createtime desc;'
    return exec(sql)
}

const getDetail = (id) => {
    const sql = `select * from blogs where id=${id};`
    return exec(sql).then(result => result[0])
}

const newBlog = (req, data) => {
    const { title, content } = data
    title = xss(title)
    content = xss(content)
    const author = req.author,
        createtime = Date.now();
    const sql = `
        insert into blogs (title, content, createtime, author) values 
        ('${title}','${content}',${createtime},'${author}');
    `
    return exec(sql).then(result => ({ id: result.insertId }))
}

const updateBlog = (data) => {
    const { title, content, id } = data
    let sql = `update blogs set title='${title}', content='${content}' where id=${id};`
    return exec(sql).then(result => {
        if(result.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBlog = (req) => {
    const sql = `delete from blogs where id=${req.body.id} and author='${req.author}';`
    return exec(sql).then(result => {
        if(result.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}