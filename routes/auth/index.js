const { Router } = require('express')
const registerRoute = require('./register')

const router = Router()

router.use('/register', registerRoute)

module.exports = router
