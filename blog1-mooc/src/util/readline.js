const fs = require('fs')
const readline = require('readline')
const path = require('path')

// 生成 Read stream
function createReadStream(filename) {
    const fullFilename = path.join(__dirname, '../', '../', 'logs', filename)
    const readStream = fs.createReadStream(fullFilename)
    return readStream
}

//写日志
const accessReadStream = createReadStream('access.log')

const rl = readline.createInterface({
    input: accessReadStream
})

let chrome = 0,
    sum = 0;

rl.on('line', function(line) {
    if(!line) {
        return
    }
    sum++
    const arrs = line.split('---')
    if(arrs[2] && arrs[2].indexOf('Chrome') !== -1) {
        chrome++
    }
})
rl.on('close', function() {
console.log(sum, chrome)
    console.log('Chrome占比为' + Math.round(chrome / sum * 10000) / 100+ '%')
})