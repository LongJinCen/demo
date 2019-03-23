const Sequelize = require('sequelize')
const mysqlConfig = require('../config/mysqlConfig')

const { database, username, password, config } = mysqlConfig
const sequelize = new Sequelize(database, username, password, config)


sequelize.authenticate().then(() => {
  console.log('连接成功')
}).catch((err) => {
  console.log(err)
})

module.exports = {
  sequelize
}