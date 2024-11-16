import { genSalt, hash, compare } from 'bcrypt'
import { env } from 'process'
import { sign, verify } from 'jsonwebtoken'

const genRandomString = async (length) => {
  return await genSalt(length)
}

const saltHashPassword = async (password) => {
  var salt = await genRandomString(12) /** Gives us salt of length 12 */
  return await hash(password, salt)
}

const isPasswordCorrect = async (password, hashedPassword) => {
  return (await compare(password, hashedPassword)) ? true : false
}

const generateTokens = (user) => {
  const accessToken = sign(user, env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
  const refreshToken = sign(user, env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

  return { accessToken, refreshToken }
}

const decodeToken = (token, secret) => {
  return verify(token, secret)
}

export const authenticator = {
  saltHashPassword,
  isPasswordCorrect,
  generateTokens,
  decodeToken
}
