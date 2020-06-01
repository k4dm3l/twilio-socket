/** Import Models */
const userModel = require('../models/user.model')

const newUser = async (newUserData) => {
  const newUser = await userModel.create(newUserData)
  return newUser._id
}

const getUserById = async (userId) => {
  const user = await userModel.findById(userId)
                .select('userName phoneNumber countryId')
                .lean()
                .exec()
  return user
}

const getUserByPhoneNumber = async (phoneNumber) => {
  const user = await userModel.findOne({ phoneNumber: phoneNumber })
                .select('_id')
                .lean()
                .exec()

  return user
}

const getUsers = async () => {
  const users = await userModel.find({ isActive: true })
                  .select('userName')
                  .lean()
                  .exec()
  return users
}

module.exports = {
  newUser,
  getUserById,
  getUsers,
  getUserByPhoneNumber
}