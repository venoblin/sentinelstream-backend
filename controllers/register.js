const repo = require('../repositories/user')
const { hashPassword } = require('../middlewares')
const { sanitizeUser } = require('../utils')

const controllers = {}

controllers.registerUser = async (req, res) => {
  try {
    const { password } = req.body

    const hash = await hashPassword(password)

    let createdUser = await repo.createUser({
      ...req.body,
      password: hash
    })

    return res.status(201).json({ user: sanitizeUser(createdUser) })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = controllers
