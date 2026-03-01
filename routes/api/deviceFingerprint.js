const { Router } = require('express')
const controllers = require('../../controllers/deviceFingerprint')
const middlewares = require('../../middlewares')

const router = Router()

router.post('/', middlewares.verifyToken, controllers.postDeviceFingerprint)
router.get(
  '/',
  middlewares.decodeParamsIds,
  middlewares.verifyToken,
  controllers.getAllDeviceFingerprints
)
router.get(
  '/:id',
  middlewares.decodeParamsIds,
  middlewares.decodeRouteId,
  middlewares.verifyToken,
  controllers.getDeviceFingerprintById
)
router.patch(
  '/:id',
  middlewares.decodeRouteId,
  middlewares.verifyToken,
  controllers.patchDeviceFingerprintById
)
router.delete(
  '/:id',
  middlewares.decodeRouteId,
  middlewares.verifyToken,
  controllers.deleteDeviceFingerprintById
)

module.exports = router
