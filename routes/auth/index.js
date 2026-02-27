const { Router } = require('express')
const registerRoutes = require('./register')
const loginRoutes = require('./login')
const sessionRoutes = require('./session')
const logoutRoutes = require('./logout')

const router = Router()

router.use('/register', registerRoutes)
router.use('/login', loginRoutes)
router.use('/session', sessionRoutes)
router.use('/logout', logoutRoutes)

module.exports = router
