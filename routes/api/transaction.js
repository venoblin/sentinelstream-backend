const { Router } = require('express')
const controllers = require('../../controllers/transaction')
const middlewares = require('../../middlewares')

const router = Router()

router.post('/', middlewares.verifyToken, controllers.postTransaction)
router.get(
  '/',
  middlewares.decodeParamsIds,
  middlewares.verifyToken,
  controllers.getAllTransactions
)
router.get(
  '/:id',
  middlewares.decodeParamsIds,
  middlewares.decodeRouteId,
  middlewares.verifyToken,
  controllers.getTransactionById
)
router.patch(
  '/:id',
  middlewares.decodeRouteId,
  middlewares.verifyToken,
  controllers.patchTransactionById
)

module.exports = router
