const { Router } = require('express')

/** Import Controllers */
const { 
  createNewUser,
  getUser,
  getAllUsers
} = require('./controllers/user.controller')

/** Import utils libraries */
const { catchErrors } = require('../../utils/catchError')

const router = Router()

/** GET Routes */

/** Get all users */
router.get('/all', catchErrors(getAllUsers))
/** Get info of a specific user */
router.get('/:userId/info', catchErrors(getUser))

/** POST Routes */

/** Create User */
router.post('/new', catchErrors(createNewUser))

module.exports = { router }