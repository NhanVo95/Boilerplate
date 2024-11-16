import Joi from 'joi'

import { PASSWORD_RULE, ROLES_RULE } from '~/utilities/validators'
import { GET_DB } from '~/config/mongodb'
import { convertObjectId } from '~/utilities/convertObjectId'
import { authenticator } from '~/utilities/authenticator'

// Define Collection (name & schema)
const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(2).max(50).trim().strict(),
  email: Joi.string().email().required().strict(),
  password: Joi.string().required().pattern(PASSWORD_RULE).strict().messages({
    'string.base': 'Password should be a type of "text"',
    'string.empty': 'Password cannot be an empty field',
    'any.required': 'Password is a required field',
    'string.min': 'Password is too short - should be {#limit} chars minimum.',
    'string.max': 'Password is too long - should be {#limit} chars maximum.',
    'string.pattern.base': 'Please create a stronger password.'
  }),
  role: Joi.array()
    .items(Joi.number().valid(ROLES_RULE.User, ROLES_RULE.Editor, ROLES_RULE.Admin))
    .default([ROLES_RULE.User]),
  // role: Joi.string().valid('admin', 'staff', 'client').default('client'),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const findOneByEmail = async (email) => {
  try {
    const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne({
      email: email
    })

    return result
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const isEmailExist = await findOneByEmail(validData.email)

    if (!isEmailExist) {
      const newUserData = {
        ...validData,
        password: await authenticator.saltHashPassword(validData.password)
      }

      const createdUser = await GET_DB().collection(USER_COLLECTION_NAME).insertOne(newUserData)

      return { ...createdUser, created: true }
    } else {
      return { created: false, message: 'Email exited' }
    }
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne({
        _id: convertObjectId(id)
      })

    return result
  } catch (error) {
    throw new Error(error)
  }
}

const updateUser = async (id, data) => {
  try {
    const options = { upsert: false }

    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .updateOne({ _id: id }, { $set: data }, options)

    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  createNew,
  findOneByEmail,
  findOneById,
  updateUser
}
