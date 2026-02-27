const { Router } = require('express')
const controllers = require('../../controllers/logout')

const router = Router()

router.post('/', controllers.logoutUser)

module.exports = router
