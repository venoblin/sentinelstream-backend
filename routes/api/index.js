const { Router } = require('express')
const fraudRuleRoutes = require('./fraudRule')
const userRoutes = require('./user')
const transactionRoutes = require('./transaction')
const deviceFingerprintRoutes = require('./deviceFingerprint')

const router = Router()

router.use('/fraud-rules', fraudRuleRoutes)
router.use('/users', userRoutes)
router.use('/transactions', transactionRoutes)
router.use('/device-fingerprints', deviceFingerprintRoutes)

module.exports = router
