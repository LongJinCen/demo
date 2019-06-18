const { REDIS_CONFIG } = require('../conf/db')
const redis = require("redis")

const client = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);

client.on("error", function (err) {
    console.log("Error " + err);
});


module.exports = client