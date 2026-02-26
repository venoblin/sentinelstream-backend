const { Router } = require('express')
const registerRoutes = require('./register')
const loginRoutes = require('./login')
const sessionRoutes = require('./session')

const router = Router()

router.use('/register', registerRoutes)
router.use('/login', loginRoutes)
router.use('/session', sessionRoutes)

module.exports = router
