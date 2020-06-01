const { Router } = require('express')

/** Import components routers */
const userRouter = require('../components/user/user.router')
const messageRouter = require('../components/message/message.router')

const router = Router()

router.get('/', (req, res) => res.json({ message: 'Main Route - hello' }))

router.use('/user', userRouter.router)
router.use('/message', messageRouter.router)

module.exports = { router }