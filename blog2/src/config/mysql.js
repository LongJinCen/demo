module.exports = {
  database: 'blog',
  user: 'blog',
  password: 'Blog@123',
  other: {
    host: '118.24.98.106',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
}