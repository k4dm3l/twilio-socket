'use strict'

const http = require('http')
const express = require('express')
const compression = require('compression')
const helmet = require('helmet')

const morgan = require('morgan')

const { router } = require('../src/routes/router')
const { config } = require('./config')
const connectDb = require('./database')

const { 
  notFoundHandler,
  logErrors,
  wrapErrors,
  errorHandler,
  handlerFatalError } = require('./middlewares/errorHandlers')

const app = express()
const server = http.createServer(app)

require('./sockets').connectionSocket(server)

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(helmet())

app.use(`/api/${config.apiVersion}`, router)

app.use(notFoundHandler)

app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

const startServer = async () => {
  try {
    await connectDb()
    console.log('Database connection established')
    server.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`)
    })
  } catch (err) {
    process.on('uncaughtException', handlerFatalError(err))
    process.on('uncaughtException', handlerFatalError(err))
  }
}

module.exports = { startServer }