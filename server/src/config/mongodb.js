import { env } from 'process'
import { log } from '~/utilities/logger'

import { MongoClient, ServerApiVersion } from 'mongodb'

const MONGODB_URI = env.MONGODB_LOCAL_URI
const DATABASE_NAME = env.DATABASE_NAME

let theAugustHouseDatabaseInstance = null

const mongoClientInstance = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  log('info', 'Connecting to MongoDB...')
  await mongoClientInstance.connect()
  log('info', 'Connected to MongoDB!')

  theAugustHouseDatabaseInstance = mongoClientInstance.db(DATABASE_NAME)
}

export const DISCONNECT_DB = async () => {
  await mongoClientInstance.close()
  log('info', 'Disconnected to MongoDB!')
}

export const GET_DB = () => {
  if (!theAugustHouseDatabaseInstance)
    throw new Error('Must connect to Database first')
  return theAugustHouseDatabaseInstance
}
