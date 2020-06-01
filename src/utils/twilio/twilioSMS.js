const { config } = require('../../config')
const twilio = require('twilio')(config.accountSID, config.authTokenTwilio)
const MessagingResponse = require('twilio').twiml.MessagingResponse

async function sendSMSMessage(phoneNumberDestination, message) {
  const messageResponse = await twilio.messages.create({
    to: phoneNumberDestination,
    from: config.twilioPhone,
    body: message
  })

  return { sid: messageResponse.sid, status: messageResponse.status, error: messageResponse.errorCode }
}

function responseSuccessTwilio(resObj) {
  const twiml = new MessagingResponse();
  resObj.send(twiml.message('Received').toString())
}

module.exports = {
  sendSMSMessage,
  responseSuccessTwilio
}