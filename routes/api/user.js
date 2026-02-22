const { Router } = require('express')
const controllers = require('../../controllers/user')
const middlewares = require('../../middlewares')

const router = Router()

router.get(
  '/',
  middlewares.stripToken,
  middlewares.verifyToken,
  middlewares.verifyAnalyst,
  controllers.getAllUsers
)
router.get(
  '/:id',
  middlewares.stripToken,
  middlewares.verifyToken,
  middlewares.verifyUserId,
  controllers.getUserById
)
router.patch(
  '/:id',
  middlewares.stripToken,
  middlewares.verifyToken,
  middlewares.verifyUserId,
  controllers.patchUserById
)

module.exports = router
