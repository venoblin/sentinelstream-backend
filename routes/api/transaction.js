const { Router } = require('express')
const controllers = require('../../controllers/transaction')
const middlewares = require('../../middlewares')

const router = Router()

router.post('/', middlewares.verifyToken, controllers.postTransaction)
router.get('/', middlewares.verifyToken, controllers.getAllTransactions)
router.get('/:id', middlewares.verifyToken, controllers.getTransactionById)
router.patch('/:id', middlewares.verifyToken, controllers.patchTransactionById)

module.exports = router
