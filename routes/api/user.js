const { Router } = require('express')
const controllers = require('../../controllers/user')

const router = Router()

router.get('/', controllers.getAllUsers)
router.get('/:id', controllers.getUserById)

module.exports = router
