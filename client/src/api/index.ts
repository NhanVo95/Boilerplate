import { env } from 'process'
import axios from 'axios'

interface NewUserData {
  email: string
  name: string
  password: string
}

interface UserData {
  email: string
  password: string
}

interface Token {
  token: string
}

const API_ROOT = env.API_ROOT

const axiosPublic = axios.create({
  baseURL: API_ROOT,
  headers: {
    'Content-Type': 'application/json'
  }
})

const axiosPrivate = axios.create({
  baseURL: API_ROOT,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true
  }
})

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const createNewUserAPI = async (newUserData: NewUserData) => {
  return await axiosPublic
    .post('/v1/user/signup', newUserData)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        return error.response.data
      }
    })
}

export const loginUserAPI = async (UserData: UserData) => {
  return await axiosPublic
    .post('/v1/user/login', UserData)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      if (!error?.response) {
        return 'No Server Response'
      } else if (error.response?.status === 400) {
        return 'Missing Username or Password'
      } else if (error.response?.status === 401) {
        return 'Email or Password incorrect'
      } else {
        return 'Login Failed'
      }
    })
}

export const refreshTokenAPI = async (token: Token) => {
  return await axiosPrivate
    .post('/v1/user/token', token)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      if (!error?.response) {
        return 'No Server Response'
      } else if (error.response?.status === 400) {
        return 'Missing Token'
      } else if (error.response?.status === 401) {
        return 'Unauthorized'
      } else {
        return 'Login Failed'
      }
    })
}
