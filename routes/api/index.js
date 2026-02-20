const { Router } = require('express')
const fraudRuleRoutes = require('./fraudRule')
const userRoutes = require('./user')

const router = Router()

router.use('/fraud-rules', fraudRuleRoutes)
router.use('/users', userRoutes)

module.exports = router
