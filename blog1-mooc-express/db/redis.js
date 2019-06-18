const { REDIS_CONFIG } = require('../conf/db')
const redis = require("redis")

const client = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);

client.on("error", function (err) {
    console.log("Error " + err);
});

function set(key, value) {
    if(typeof value === 'object') {
        value = JSON.stringify(value)
    }
    client.set(key, value)
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        client.get(key, function(err, reply) {
            if(err) {
                reject(err)
            }
            if(reply === null) {
                resolve(null)
            }
            try {
                resolve(
                    JSON.parse(reply)
                )
            } catch (error) {
                resolve(reply)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get
}