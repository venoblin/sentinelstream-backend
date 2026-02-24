const { Router } = require('express')
const controllers = require('../../controllers/auditLog')
const middlewares = require('../../middlewares')

const router = Router()

router.post(
  '/',
  middlewares.stripToken,
  middlewares.verifyToken,
  middlewares.verifyAnalyst,
  controllers.postAuditLog
)
router.get(
  '/',
  middlewares.stripToken,
  middlewares.verifyToken,
  middlewares.verifyAnalyst,
  controllers.getAllAuditLogs
)
router.get(
  '/:id',
  middlewares.stripToken,
  middlewares.verifyToken,
  middlewares.verifyAnalyst,
  controllers.getAuditLogById
)

module.exports = router
