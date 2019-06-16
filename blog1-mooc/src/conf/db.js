const env = process.env.NODE_ENV;

let MYSQL_CONFIG

if (env === 'dev') {
    MYSQL_CONFIG = {
        host     : 'localhost',
        user     : 'root',
        password : 'WAD241820',
        database : 'myblog',
        port: 3306
    }
}

if(env === 'production') {
    MYSQL_CONFIG = {
        host     : 'localhost',
        user     : 'root',
        password : 'WAD241820',
        database : 'myblog',
        port: 3306
    }
}

module.exports = {
    MYSQL_CONFIG
}