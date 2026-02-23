const { Router } = require('express')
const fraudRuleRoutes = require('./fraudRule')
const userRoutes = require('./user')
const transactionRoutes = require('./transaction')
const deviceFingerprintRoutes = require('./deviceFingerprint')
const auditLogRoutes = require('./auditLog')

const router = Router()

router.use('/fraud-rules', fraudRuleRoutes)
router.use('/users', userRoutes)
router.use('/transactions', transactionRoutes)
router.use('/device-fingerprints', deviceFingerprintRoutes)
router.use('/audit-logs', auditLogRoutes)

module.exports = router
