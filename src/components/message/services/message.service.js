const boom = require('@hapi/boom')
const { Types } = require('mongoose')

/** Import Models */
const messageModel = require('../models/message.model')

const saveMessage = async (newMessageData) => {
  const newMessage = await messageModel.create(newMessageData)
  return newMessage._id
}

const getMessageByUserId = async (userId) => {
  const messages = await messageModel.aggregate([
    { $match: { user: Types.ObjectId(userId) } },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'userData'
      }
    },
    { $unwind: '$userData' },
    { 
      $project: { 
        sid: '$$ROOT.sid',
        status: '$$ROOT.status',
        message: '$$ROOT.message',
        userName: '$$ROOT.userData.userName',
        phoneNumber: '$$ROOT.userData.phoneNumber'
      }
    }
  ])
  .exec()
  
  if (!messages.length) throw boom.notFound(`No messages associtated with user id ${userId}`)
  return messages
}

module.exports = { saveMessage, getMessageByUserId }