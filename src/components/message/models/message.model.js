const { Schema, model } = require('mongoose')

const MessageSchema = new Schema({
  sid: {
    type: String,
    trim: true
  },
  status: String,
  message: {
    type: String,
    trim: true
  },
  error: String,
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  typeMessage: {
    type: String,
    enum: [ 'INBOUND', 'OUTBOUND' ],
    required: true
  }
}, {
  timestamps: true
})

MessageSchema.index({ sid: 'text' })

module.exports = model('Message', MessageSchema)