const { Router } = require('express')
const registerRoutes = require('./register')

const router = Router()

router.use('/register', registerRoutes)

module.exports = router
