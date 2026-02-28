const { Router } = require('express')
const controllers = require('../../controllers/deviceFingerprint')
const middlewares = require('../../middlewares')

const router = Router()

router.post('/', middlewares.verifyToken, controllers.postDeviceFingerprint)
router.get('/', middlewares.verifyToken, controllers.getAllDeviceFingerprints)
router.get(
  '/:id',
  middlewares.verifyToken,
  middlewares.decodeRouteId,
  controllers.getDeviceFingerprintById
)
router.patch(
  '/:id',
  middlewares.verifyToken,
  middlewares.decodeRouteId,
  controllers.patchDeviceFingerprintById
)
router.delete(
  '/:id',
  middlewares.verifyToken,
  middlewares.decodeRouteId,
  controllers.deleteDeviceFingerprintById
)

module.exports = router
