const { Router } = require('express')
const controllers = require('../../controllers/fraudRule')

const router = Router()

router.post('/', controllers.postFraudRule)
router.get('/', controllers.getAllFraudRules)
router.get('/:id', controllers.getFraudRuleById)

module.exports = router
