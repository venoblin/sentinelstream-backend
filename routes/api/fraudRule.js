const { Router } = require('express')
const controllers = require('../../controllers/fraudRule')

const router = Router()

router.post('/', controllers.postFraudRule)

module.exports = router
