const redis = require('redis')

const redisOptions = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT)
}

const client = redis.createClient(redisOptions)

const EXPIRE_TIME = 3600 * 24 // 1 day

const getValue = (id, callback) => {
  client.get(id, (err, data) => {
    if (err) {
      throw err
    }

    return callback(null, JSON.parse(data))
  })
}

const putValue = (id, value) => {
  client.setex(id, EXPIRE_TIME, JSON.stringify(value))
}

module.exports = {
  getValue,
  putValue
}
