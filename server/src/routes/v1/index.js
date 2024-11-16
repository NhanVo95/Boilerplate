import express from 'express'

import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

import { userRoute } from '~/routes/v1/userRoute'
import { clientRoute } from '~/routes/v1/clientRoute'
import { generalRoute } from '~/routes/v1/generalRoute'
import { managementRoute } from '~/routes/v1/managementRoute'
import { salesRoute } from '~/routes/v1/salesRoute'

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.' })
})

Router.use('/user', userRoute)
Router.use('/client', clientRoute)
Router.use('/general', generalRoute)
Router.use('/management', managementRoute)
Router.use('/sales', salesRoute)

export const APIs_V1 = Router
