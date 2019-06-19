const { exec } = require('../db/mysql')
const xss = require('xss')

const getList = async (author, keyword) => {
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

const getDetail = async (id) => {
    const sql = `select * from blogs where id=${id};`
    const result = await await exec(sql)
    return result[0]
}

const newBlog = async (req, data) => {
    let { title, content } = data
    title = xss(title)
    content = xss(content)
    const author = req.author,
        createtime = Date.now();
    const sql = `
        insert into blogs (title, content, createtime, author) values 
        ('${title}','${content}',${createtime},'${author}');
    `
    const result = await exec(sql)
    return { id: result.insertId }
}

const updateBlog = async (data) => {
    const { title, content, id } = data
    let sql = `update blogs set title='${title}', content='${content}' where id=${id};`
    const result = await exec(sql)
    if(result.affectedRows > 0) {
        return true
    }
    return false
}

const delBlog = async (ctx) => {
    const sql = `delete from blogs where id=${ctx.request.body.id} and author='${ctx.author}';`
    const result = await exec(sql)
    if(result.affectedRows > 0) {
        return true
    }
    return false
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}