const { Router } = require('express')
const controllers = require('../../controllers/fraudRule')
const middlewares = require('../../middlewares')

const router = Router()

router.post(
  '/',
  middlewares.stripToken,
  middlewares.verifyToken,
  middlewares.verifyRole('analyst'),
  controllers.postFraudRule
)
router.get(
  '/',
  middlewares.stripToken,
  middlewares.verifyToken,
  middlewares.verifyRole('analyst'),
  controllers.getAllFraudRules
)
router.get(
  '/:id',
  middlewares.stripToken,
  middlewares.verifyToken,
  middlewares.verifyRole('analyst'),
  controllers.getFraudRuleById
)

module.exports = router
