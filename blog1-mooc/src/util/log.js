const fs = require('fs')
const path = require('path')

//写日志
function writeLog(writeStream, log) {
    writeStream.write(log + '\n')
}

// 生成 write stream
function createWriteStream(filename) {
    const fullFilename = path.join(__dirname, '../', '../', 'logs', filename)
    const writeStream = fs.createWriteStream(fullFilename, { flags: 'a' })
    return writeStream
}

//写日志
const accessWriteStream = createWriteStream('access.log')
function access(log) {
    writeLog(accessWriteStream, log)
}

module.exports = {
    access
}