'use strict'

const mongoose = require('mongoose')
const { config } = require('../src/config')

const connectionUrl = `mongodb+srv://${config.mongoDbUsername}:${config.mongoDbPassword}@${config.mongoDbHost}/${config.mongoDbName}`

module.exports = async (url = connectionUrl) => {
  try {
    await mongoose.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      }
    )
  } catch (err) {
    throw(err)
  }
}
