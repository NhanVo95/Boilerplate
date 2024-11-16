const redis = require('redis')
import { env } from 'process'
import { log } from '~/utilities/logger'

const REDIS_URL = env.REDIS_URL
const client = redis.createClient({
  url: REDIS_URL
})

client.on('error', (err) => err)

export const CONNECT_Redis = async function () {
  log('info', 'Connecting to Redis...')
  try {
    await client.connect()

    log('info', 'Redis connected')
  } catch (error) {
    log('error', error)
  }
}

export const storeRedis = async function (id, data) {
  delete data.checked

  var result = await client.hSet('user-session:' + id, data)

  client.expire('user-session:', 24 * 60 * 60)

  return result
}

export const retrieveRedis = async function (id) {
  var filter = 'user-session:' + id
  let userSession = await client.hGetAll(filter)

  return userSession

  // return JSON.stringify(userSession, null, 2);
}
