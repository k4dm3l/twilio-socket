const { Router } = require('express')

/** Import Controllers */
const { 
  getMessagesByUser,
  sendUserSMS,
  receiveTwilioMessage
} = require('./controllers/message.controller')

/** Import utils libraries */
const { catchErrors } = require('../../utils/catchError')

const router = Router()

/** GET Routes */

/** Get all messages related with an user*/
router.get('/:userId/all', catchErrors(getMessagesByUser))

/** POST Routes */

/** Send message for a specific user */
router.post('/:userId/send', catchErrors(sendUserSMS))
/** Receive message request for twilio */
router.post('/receive', catchErrors(receiveTwilioMessage))

module.exports = { router }