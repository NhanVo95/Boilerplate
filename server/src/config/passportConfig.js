import { Strategy as LocalStrategy } from 'passport-local'
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt'
import { authenticator } from '~/utilities/authenticator'
import { omit } from 'lodash'

import { env } from 'process'

import { userModel } from '~/models/userModel'

export const initializePassport = (passport) => {
  const authenticateUser = async (email, password, done) => {
    const user = await userModel.findOneByEmail(email)

    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      const result = await authenticator.isPasswordCorrect(password, user.password)
      if (result) {
        const data = omit(user, ['password', '_destroy', 'accessToken', 'refreshToken'])
        const { accessToken, refreshToken } = authenticator.generateTokens(data)

        userModel.updateUser(user._id, {
          accessToken: accessToken,
          refreshToken: refreshToken
        })

        return done(
          null,
          { ...data, accessToken: accessToken, refreshToken: refreshToken },
          { message: 'Logged in successfully' }
        )
      } else {
        return done(null, false, { message: 'Email or Password incorrect' })
      }
    } catch (error) {
      return done(error, false)
    }
  }

  const jwtAuthenticateToken = async (jwtPayload, done) => {
    try {
      const user = await userModel.findOneById(jwtPayload._id)

      if (user) {
        return done(null, user, { message: 'Logged in successfully' })
      } else {
        return done(null, false, { message: 'Token expired' })
      }
    } catch (error) {
      return done(error, false)
    }
  }

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      authenticateUser
    )
  )

  passport.use(
    new jwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: env.ACCESS_TOKEN_SECRET
      },
      jwtAuthenticateToken
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    return done(null, userModel.findOneById(id))
  })
}
