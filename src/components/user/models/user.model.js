const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  phoneNumber: {
    type: String,
    trim: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  countryId : {
    type: String,
    trim: true,
    required: true
  }
}, {
  timestamps: true
})

module.exports = model('User', UserSchema)