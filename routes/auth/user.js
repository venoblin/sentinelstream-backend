const { Router } = require('express')
const controllers = require('../../controllers/user')

const router = Router()

router.post('/', controllers.registerUser)

module.exports = router
