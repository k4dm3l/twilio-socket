const boom = require('@hapi/boom')

/** Import config object */
const { config } = require('../../../config')

/** Import utils libraries */
const { sendSMSMessage, responseSuccessTwilio } = require('../../../utils/twilio/twilioSMS')
const { getSocket } = require('../../../sockets')

/** Import Services */
const { getMessageByUserId, saveMessage } = require('../services/message.service')
const { getUserById, getUserByPhoneNumber } = require('../../user/services/user.service')

const sendUserSMS = async (req, res) => {
  const { userId } = req.params
  const { message } = req.body
  const { phoneNumber, countryId } = await getUserById(userId)

  if (!phoneNumber || phoneNumber !== config.testPhone) throw boom.badImplementation('User has not an available phone number registed')
  if (!countryId) throw boom.badImplementation('User has not an available country phone code')

  const twilioResponse = await sendSMSMessage(`${countryId}${phoneNumber}`, message)

  if (!twilioResponse || twilioResponse.error) throw boom.failedDependency('Issue with third-party service. Please contact support')

  const newMessage = await saveMessage({ 
    ...twilioResponse,
    message,
    user: userId,
    typeMessage: 'OUTBOUND'
  })

  if (!newMessage) throw boom.internal('Error saving message in database')
  
  res.status(201).json({ data: { 
    ...twilioResponse,
    user: userId,
    typeMessage: 'OUTBOUND', 
    _id: newMessage} })
}

const receiveTwilioMessage = async (req, res) => {

  if (!req.body) boom.failedDependency('Third-party service empty body response - Please contact support')
  
  const incomingMessage = {
    sid: req.body.MessageSid,
    status: req.body.SmsStatus,
    message: req.body.Body,
    error: '',
    user: '',
    typeMessage: 'INBOUND'
  }

  responseSuccessTwilio(res)

  const user = await getUserByPhoneNumber(req.body.From.substring(3, req.body.From.length))

  if (!user) boom.notFound(`No user associated with phone ${req.body.From}`)
  incomingMessage.user = user._id
  const newMessage = await saveMessage(incomingMessage)
  getSocket().emit('new message', `${newMessage} - New server message`)
  console.log(`New incoming message saved - ${newMessage}`)
}

const getMessagesByUser = async (req, res) => {
  const { userId } = req.params
  res.status(201).json({ userId, message: await getMessageByUserId(userId) })
}

module.exports = { 
  sendUserSMS,
  receiveTwilioMessage,
  getMessagesByUser
}