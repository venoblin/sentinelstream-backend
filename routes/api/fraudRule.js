const { Router } = require('express')
const controllers = require('../../controllers/fraudRule')
const middlewares = require('../../middlewares')

const router = Router()

router.post(
  '/',
  middlewares.verifyToken,
  middlewares.verifyAnalyst,
  controllers.postFraudRule
)
router.get(
  '/',
  middlewares.verifyToken,
  middlewares.verifyAnalyst,
  controllers.getAllFraudRules
)
router.get(
  '/:id',
  middlewares.verifyToken,
  middlewares.verifyAnalyst,
  middlewares.decodeRouteId,
  controllers.getFraudRuleById
)
router.patch(
  '/:id',
  middlewares.verifyToken,
  middlewares.verifyAnalyst,
  middlewares.decodeRouteId,
  controllers.patchFraudRuleById
)

module.exports = router
