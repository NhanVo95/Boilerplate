import Joi from 'joi'
import { log } from '~/utilities/logger'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utilities/ApiError'
import { PASSWORD_RULE, JWT_RULE, ROLES_RULE } from '~/utilities/validators'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().required().min(2).max(50).trim().strict(),
    email: Joi.string().email().required().strict(),
    password: Joi.string().required().pattern(PASSWORD_RULE).strict().messages({
      'string.base': 'Password should be a type of "text"',
      'string.empty': 'Password cannot be an empty field',
      'any.required': 'Password is a required field',
      'string.pattern.base': 'Please create a stronger password.'
    }),
    role: Joi.array()
      .items(Joi.number().valid(ROLES_RULE.User, ROLES_RULE.Editor, ROLES_RULE.Admin))
      .default([ROLES_RULE.User])
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })

    log('debug', 'Validation - Validate to create new user: %o', req.body)

    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const login = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().email().required().strict().error(new Error('Email or password incorrect')),
    password: Joi.string()
      .required()
      .pattern(PASSWORD_RULE)
      .strict()
      .error(new Error('Email or password incorrect'))
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })

    log('debug', 'Validation - Validate to login user: %o', req.body)

    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, new Error(error).message))
  }
}

const verifyToken = async (req, res, next) => {
  const correctCondition = Joi.string().pattern(JWT_RULE)

  const { refreshToken } = req.body

  try {
    await correctCondition.validateAsync(refreshToken)

    log('debug', 'Validation - Validate to Token: %o', req.body)

    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, new Error(error).message))
  }
}

export const userValidation = { createNew, login, verifyToken }
