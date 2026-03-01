const { Router } = require('express')
const controllers = require('../../controllers/user')
const middlewares = require('../../middlewares')

const router = Router()

router.get(
  '/',
  middlewares.decodeParamsIds,
  middlewares.verifyToken,
  middlewares.verifyAnalyst,
  controllers.getAllUsers
)
router.get(
  '/:id',
  middlewares.decodeParamsIds,
  middlewares.decodeRouteId,
  middlewares.verifyToken,
  middlewares.verifyUserId,
  controllers.getUserById
)
router.patch(
  '/:id',
  middlewares.decodeRouteId,
  middlewares.verifyToken,
  middlewares.verifyUserId,
  controllers.patchUserById
)
router.delete(
  '/:id',
  middlewares.decodeRouteId,
  middlewares.verifyToken,
  middlewares.verifyUserId,
  controllers.deleteUserById
)

module.exports = router
