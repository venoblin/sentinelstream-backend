const { Router } = require('express')
const controllers = require('../../controllers/session')
const middlewares = require('../../middlewares')

const router = Router()

router.get('/', middlewares.verifyToken, controllers.checkSession)

module.exports = router
