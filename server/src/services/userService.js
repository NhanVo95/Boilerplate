import { userModel } from '~/models/userModel'

import { authenticator } from '~/utilities/authenticator'

import { omit } from 'lodash'

const createNew = async (reqBody) => {
  try {
    //NOTE - Xu ly logic du lieu tuy dac thu du an
    const newUser = { ...reqBody }

    const createUser = await userModel.createNew(newUser)

    if (createUser.created) {
      const getNewUser = await userModel.findOneById(createUser.insertedId)

      const user = omit(getNewUser, ['_id', 'password', '_destroy'])
      return { ...user, created: createUser.created }
    } else {
      return createUser
    }
  } catch (error) {
    throw error
  }
}

const login = async (reqBody) => {
  try {
    return omit(reqBody.user, ['_id', 'password', '_destroy'])
  } catch (error) {
    throw error
  }
}

const verifyToken = async (token, secret) => {
  const data = authenticator.decodeToken(token, secret)

  let user = await userModel.findOneById(data._id)

  if (!user || user.refreshToken !== token) {
    return { statusCode: 'UNAUTHORIZED', message: 'Invalid Refresh Token' }
  }

  user = omit(user, ['password', '_destroy', 'accessToken', 'refreshToken'])
  const { accessToken, refreshToken } = authenticator.generateTokens(user)

  await userModel.updateUser(user._id, {
    accessToken: accessToken,
    refreshToken: refreshToken
  })

  return { ...omit(user, ['_id']), accessToken: accessToken, refreshToken: refreshToken }
}

export const userService = {
  createNew,
  login,
  verifyToken
}
