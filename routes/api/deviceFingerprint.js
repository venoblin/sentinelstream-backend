const { Router } = require('express')
const controllers = require('../../controllers/deviceFingerprint')
const middlewares = require('../../middlewares')

const router = Router()

router.post(
  '/',
  middlewares.stripToken,
  middlewares.verifyToken,
  controllers.postDeviceFingerprint
)
router.get(
  '/',
  middlewares.stripToken,
  middlewares.verifyToken,
  controllers.getAllDeviceFingerprints
)
router.get(
  '/:id',
  middlewares.stripToken,
  middlewares.verifyToken,
  controllers.getDeviceFingerprintById
)

module.exports = router
