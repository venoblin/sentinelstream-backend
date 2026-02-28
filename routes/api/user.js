const { Router } = require('express')
const controllers = require('../../controllers/user')
const middlewares = require('../../middlewares')

const router = Router()

router.get(
  '/',
  middlewares.verifyToken,
  middlewares.verifyAnalyst,
  controllers.getAllUsers
)
router.get(
  '/:id',
  middlewares.verifyToken,
  middlewares.verifyUserId,
  middlewares.decodeRouteId,
  controllers.getUserById
)
router.patch(
  '/:id',
  middlewares.verifyToken,
  middlewares.verifyUserId,
  middlewares.decodeRouteId,
  controllers.patchUserById
)
router.delete(
  '/:id',
  middlewares.verifyToken,
  middlewares.verifyUserId,
  middlewares.decodeRouteId,
  controllers.deleteUserById
)

module.exports = router
