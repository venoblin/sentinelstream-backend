const { Router } = require('express')
const controllers = require('../../controllers/transaction')
const middlewares = require('../../middlewares')

const router = Router()

router.post('/', middlewares.verifyToken, controllers.postTransaction)
router.get('/', middlewares.verifyToken, controllers.getAllTransactions)
router.get(
  '/:id',
  middlewares.verifyToken,
  middlewares.decodeRouteId,
  controllers.getTransactionById
)
router.patch(
  '/:id',
  middlewares.verifyToken,
  middlewares.decodeRouteId,
  controllers.patchTransactionById
)

module.exports = router
