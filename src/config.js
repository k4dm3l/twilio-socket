'use strict'

require('dotenv').config()

const config = {
  environment: process.env.NODE_ENV || 'Development',
  port: process.env.PORT || 3005,
  mongoDbName: process.env.MONGO_DB_NAME,
  mongoDbUsername: process.env.MONGO_DB_USERNAME,
  mongoDbPassword: process.env.MONGO_DB_PASSWORD,
  mongoDbHost: process.env.MONGO_DB_HOST,
  apiVersion: process.env.API_VERSION,
  accountSID: process.env.ACCOUNT_SID,
  authTokenTwilio: process.env.AUTH_TOKE_TWILIO,
  twilioPhone: process.env.TWILIO_PHONE,
  testPhone: '3105571909'
}

module.exports = { config }
