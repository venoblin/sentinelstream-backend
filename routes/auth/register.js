const { Router } = require('express')
const controllers = require('../../controllers/register')

const router = Router()

router.post('/', controllers.registerUser)

module.exports = router
