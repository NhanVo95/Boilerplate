import { log } from '~/utilities/logger'
import { env } from 'process'

import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'

const createNew = async (req, res, next) => {
  try {
    const createUser = await userService.createNew(req.body)

    if (createUser.created) {
      log('debug', 'Controller - The user successfully created: %o', createUser)

      res.status(StatusCodes.CREATED).json(createUser)
    } else {
      log(
        'debug',
        `Controller - The user was unsuccessful in creating because ${createUser.message}`
      )
      res.status(StatusCodes.CONFLICT).json(createUser)
    }
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await userService.login(req)

    res.json(user)
  } catch (error) {
    next(error)
  }
}

const verifyToken = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken

    const user = await userService.verifyToken(refreshToken, env.REFRESH_TOKEN_SECRET)

    if (user.statusCode) {
      res.status(StatusCodes[user.statusCode]).send(user.message)
    }

    res.json(user)
  } catch (error) {
    next(error)
  }
}

export const userController = { createNew, login, verifyToken }
