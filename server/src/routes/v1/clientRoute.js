import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/').get((req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs_V1: User are ready to use.' })
})
export const clientRoute = Router
