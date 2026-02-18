const { Router } = require('express')
const controller = require('../../controller/user')

const router = Router()

router.post('/', controller.registerUser)

module.exports = router
