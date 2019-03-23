const fs = require('fs')
const util = require('util')
const path = require('path')
const { fileErrorStatusCode } = require('./config/config')

function blog(id) {
  const blogPath = '../source/blog/' + `${id}.txt`
  return new Promise((resolve, reject) => {
    fs.readFile(blogPath, 'utf-8', function (err, data) {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  }).catch((err) => {
    return new Promise((resolve, reject) => {
      fs.stat(blogPath, function (err, stats) {
        reject({
          code: fileErrorStatusCode[err.code],
          message: err.message
        })
      })
    })
  })
}

function handleSideBarMenu() {
  const dirPath = '../source/blog'
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, function (err, files) {
      if (err) {
        reject(err)
      }
      resolve(files)
    })
  }).catch((err) => {
    return new Promise((resolve, reject) => {
      fs.stat(blogPath, function (err, stats) {
        reject({
          code: fileErrorStatusCode[err.code],
          message: err.message
        })
      })
    })
  })
}

module.exports = {
  blog,
  handleSideBarMenu
}