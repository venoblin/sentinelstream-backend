const { Router } = require('express')
const fraudRuleRoute = require('./fraudRule')

const router = Router()

router.use('/fraud-rules', fraudRuleRoute)

module.exports = router
