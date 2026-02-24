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
router.patch(
  '/:id',
  middlewares.stripToken,
  middlewares.verifyToken,
  controllers.patchDeviceFingerprintById
)
router.delete(
  '/:id',
  middlewares.stripToken,
  middlewares.verifyToken,
  controllers.deleteDeviceFingerprintById
)

module.exports = router
