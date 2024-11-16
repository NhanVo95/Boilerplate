import { format, transports, createLogger } from 'winston'
require('winston-daily-rotate-file')
import { basename } from 'path'
import { env } from 'process'

const { combine, timestamp, printf, align, errors, colorize, splat, json } = format

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
}

const errorFilter = format((info) => {
  return info.level === 'error' ? info : false
})

const debugFilter = format((info) => {
  return info.level === 'debug' ? info : false
})

const fileRotateTransport = new transports.DailyRotateFile({
  dirname: 'logs',
  filename: 'combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '1g',
  maxFiles: '30d'
})

const logFormat = printf((info) => `[${info.timestamp}] ${info.level}: [${info.label}] - ${info.message}`)

const logger = createLogger({
  levels: logLevels,
  level: env.BUILD_MODE === 'dev' ? env.LOG_LEVEL : 'info',
  format: combine(
    // colorize({ all: true }),
    errors({ stack: true }),
    format.label({ label: basename(require.main.filename) }),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSSZZ'
    }),
    // Format the metadata object
    format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
    align(),
    splat(),
    json(),
    logFormat
  ),
  transports: [
    fileRotateTransport,
    new transports.Console({
      format: combine(colorize(), logFormat)
    }),
    new transports.File({
      dirname: 'logs',
      filename: 'error.log',
      level: 'error',
      format: combine(errorFilter())
    }),
    new transports.File({
      dirname: 'logs',
      filename: 'debug.log',
      level: 'debug',
      format: combine(debugFilter())
    })
  ]
})

module.exports.log = (level, message, obj) => {
  !obj ? logger.log(level, message) : logger.log(level, message, obj)
}
