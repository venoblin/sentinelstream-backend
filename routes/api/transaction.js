const { Router } = require('express')
const controllers = require('../../controllers/transaction')
const middlewares = require('../../middlewares')

const router = Router()

router.post(
  '/',
  middlewares.stripToken,
  middlewares.verifyToken,
  controllers.postTransaction
)
router.get(
  '/',
  middlewares.stripToken,
  middlewares.verifyToken,
  controllers.getAllTransactions
)
router.get(
  '/:id',
  middlewares.stripToken,
  middlewares.verifyToken,
  controllers.getTransactionById
)
router.patch(
  '/:id',
  middlewares.stripToken,
  middlewares.verifyToken,
  controllers.patchTransactionById
)

module.exports = router
