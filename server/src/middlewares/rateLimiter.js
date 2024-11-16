import { rateLimit } from 'express-rate-limit'

const limitRefreshTime = 15 * 60 * 1000 // 15 minutes
const limitRequest = 100 // Limit each IP to 100 requests per `window` (here, per 15 minutes).

export const rateLimiter = rateLimit({
  windowMs: limitRefreshTime,
  limit: limitRequest,
  message: 'Too many requests from this IP, please try again after 15 minutes', // Message to send when the limit is exceeded.
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
})
