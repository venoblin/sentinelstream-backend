const { Router } = require('express')
const controllers = require('../../controllers/fraudRule')
const middlewares = require('../../middlewares')

const router = Router()

router.post(
  '/',
  middlewares.stripToken,
  middlewares.verifyToken,
  middlewares.verifyAnalyst,
  controllers.postFraudRule
)
router.get(
  '/',
  middlewares.stripToken,
  middlewares.verifyToken,
  middlewares.verifyAnalyst,
  controllers.getAllFraudRules
)
router.get(
  '/:id',
  middlewares.stripToken,
  middlewares.verifyToken,
  middlewares.verifyAnalyst,
  controllers.getFraudRuleById
)
router.patch(
  '/:id',
  middlewares.stripToken,
  middlewares.verifyToken,
  middlewares.verifyAnalyst,
  controllers.patchFraudRuleById
)

module.exports = router
