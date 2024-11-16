import express from 'express'
import cors from 'cors'
import { corsOptions } from './config/cors'
import session from 'express-session'
import os from 'os'
import { env } from 'process'
import { log } from './utilities/logger'

import { errorHandlingMiddleware, rateLimiter } from '~/middlewares'

import passport from 'passport'
import { initializePassport } from './config/passportConfig'

import exitHook from 'async-exit-hook'

import { CONNECT_DB, DISCONNECT_DB } from './config/mongodb'
import { CONNECT_Redis } from './config/redis'

import { APIs_V1 } from '~/routes/v1'

const START_SERVER = () => {
  const hostname = os.hostname
  const port = env.APP_PORT

  const app = express()

  //NOTE - Enable req.body json data
  app.use(express.json())

  app.use(cors(corsOptions))

  app.use(rateLimiter)

  app.use(express.urlencoded({ extended: false }))
  app.use(
    session({
      secret: env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    })
  )

  //NOTE - Initialize Passport
  initializePassport(passport)
  app.use(passport.initialize())
  app.use(passport.session())

  //NOTE - Use APIs V1
  app.use('/v1', APIs_V1)

  //NOTE - Middleware error handling
  app.use(errorHandlingMiddleware)

  app.listen(port, hostname, () => {
    log(
      'info',
      `Hello NhanVo, Back-end Server is running successfully at Host: ${hostname} and Port: ${port}`
    )
  })

  exitHook(() => {
    DISCONNECT_DB()
    log('info', 'Server is shutting down...')
    process.exit(1)
  })
}

;(async () => {
  try {
    await CONNECT_DB()
    await CONNECT_Redis()

    START_SERVER()
  } catch (error) {
    log('error', error)
    process.exit(1)
  }
})()
