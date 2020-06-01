'use strict'

const boom = require('@hapi/boom')
const { config } = require('../config')

function withErrorStack (error, msg, stack) {
  if (config.enviroment !== 'production') {
    return { error, msg }
  }
  return error
}

function notFoundHandler (req, res) {
  const {
    output: { statusCode, payload }
  } = boom.notFound()
  res.status(statusCode).json(payload)
}

function logErrors (err, req, res, next) {
  process.stdout.write(err.message)
  next(err)
}

function wrapErrors (err, req, res, next) {
  !err.isBoom ? next(boom.badImplementation(err)) : next(err)
}

function errorHandler (err, req, res, next) {
  const { output: { statusCode, payload }, message } = err
  res.status(statusCode).json(withErrorStack(payload.error, message, err.stack))
}

function handlerFatalError (err) {
  console.log(`Fatal Server Error: ${err.message}`)
  process.exit(1)
}

module.exports = {
  notFoundHandler,
  logErrors,
  wrapErrors,
  errorHandler,
  handlerFatalError
}