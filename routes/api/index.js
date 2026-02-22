const { Router } = require('express')
const fraudRuleRoutes = require('./fraudRule')
const userRoutes = require('./user')
const transactionRoutes = require('./transaction')

const router = Router()

router.use('/fraud-rules', fraudRuleRoutes)
router.use('/users', userRoutes)
router.use('/transactions', transactionRoutes)

module.exports = router
