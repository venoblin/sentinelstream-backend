const { Router } = require('express')
const controllers = require('../../controllers/deviceFingerprint')
const middlewares = require('../../middlewares')

const router = Router()

router.post('/', middlewares.verifyToken, controllers.postDeviceFingerprint)
router.get('/', middlewares.verifyToken, controllers.getAllDeviceFingerprints)
router.get(
  '/:id',
  middlewares.verifyToken,
  controllers.getDeviceFingerprintById
)
router.patch(
  '/:id',
  middlewares.verifyToken,
  controllers.patchDeviceFingerprintById
)
router.delete(
  '/:id',
  middlewares.verifyToken,
  controllers.deleteDeviceFingerprintById
)

module.exports = router
