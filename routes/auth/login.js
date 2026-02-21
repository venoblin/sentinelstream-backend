const { Router } = require('express')
const controllers = require('../../controllers/login')

const router = Router()

router.post('/', controllers.loginUser)

module.exports = router
