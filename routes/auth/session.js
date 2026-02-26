const { Router } = require('express')
const controllers = require('../../controllers/register')

const router = Router()

router.post('/', controllers.checkSession)

module.exports = router
