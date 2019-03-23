module.exports = {
  database: 'blog',
  username: 'blog',
  password: 'Blog@123',
  config: {
    host: '118.24.98.106',
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  }
}