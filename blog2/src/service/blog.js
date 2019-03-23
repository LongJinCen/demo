const { sequelize } = require('./index')
const Sequelize = require('sequelize')

const Blog = sequelize.define('blog', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false
})

function getBlogSingle(urlObj, req) {
  const id = + urlObj.searchParams.get('id')
  return Blog.findById(id).then(result => {
    return result || 'not found'
  })
}

function getBlogList(urlObj, req) {
  let paramsObj = {}
  urlObj.searchParams.forEach((value, name) => {
    paramsObj[name] = +value
  });
  return Blog.findAndCountAll(paramsObj).then(result => {
    return result
  })
}

function createBlogSingle(urlObj, req, data) {
  const { title , content } = data
  return Blog.create({
    title: title,
    content: content
  }).then(blog => {
    return blog
  })
}

function deleteBlogSingle(urlObj, req, data) {
  const { id } = data
  return Blog.findById(id).then(blog => {
    if (blog === null) {
      return 'not found'
    }
    return blog.destroy()
  })
}

function updateBlogSingle(urlObj, req, data) {
  return Blog.findById(data.id).then(blog => {
    if (blog === null) {
      return Promise.reject('not found')
    }
    return blog.update(data)
  })
}


module.exports = {
  getBlogSingle,
  getBlogList,
  createBlogSingle,
  deleteBlogSingle,
  updateBlogSingle
}