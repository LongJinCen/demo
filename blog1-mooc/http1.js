const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
    const method = req.method,
        contentType = req.headers['content-type'],
        url = req.url,
        path = url.split('?')[0],
        query = url.split('?')[1];
    res.setHeader('Content-type', 'application/json')

    const resData = {
        url,
        method,
        contentType,
        path,
        query
    }

    if(method.toLocaleLowerCase() == 'get') {
        res.end(JSON.stringify(resData))
    }
    if(method.toLocaleLowerCase() == 'post') {
        let data = ''
        req.on('data', function(chunck) {
            data += chunck.toString()
        })
        req.on('end', function() {
            resData.postData = data
            res.end(JSON.stringify(resData))
        })
    }
})

server.listen(3000)