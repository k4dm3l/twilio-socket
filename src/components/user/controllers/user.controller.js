const boom = require('@hapi/boom')

/** Import Services */
const { newUser, getUserById, getUsers } = require('../services/user.service')

const createNewUser = async (req, res) => {
  const { userName, phoneNumber, countryId } = req.body
  res.status(201).json({ newUser: await newUser({userName, phoneNumber, countryId}) })
}

const getUser = async (req, res) => {
  const { userId } = req.params
  const user = await getUserById(userId)

  if (!user) throw boom.notFound('User not found')
  res.status(200).json({ user })
}

const getAllUsers = async (req, res) => {
  const users = await getUsers()
  
  if (!users.length) throw boom.notFound('No users found')
  res.status(200).json({ users })
}

module.exports = { 
  createNewUser,
  getUser,
  getAllUsers
}