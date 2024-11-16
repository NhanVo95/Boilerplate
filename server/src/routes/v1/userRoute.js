import express from 'express'
import passport from 'passport'
import { StatusCodes } from 'http-status-codes'

import { userValidation } from '~/utilities/validation/userValidation'
import { userController } from '~/controllers/userController'

const Router = express.Router()

Router.route('/').get((req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ message: 'APIs_V1: User are ready to use.' })
})

Router.route('/signup').post(userValidation.createNew, userController.createNew)

Router.route('/login').post(
  userValidation.login,
  passport.authenticate('local'),
  userController.login
)

Router.route('/token').post(
  userValidation.verifyToken,
  userController.verifyToken
)

Router.route('/protected').get(
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json(req.user)
  }
)
export const userRoute = Router
