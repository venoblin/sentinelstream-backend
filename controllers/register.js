const repo = require('../repositories/user')
const { hashPassword } = require('../middlewares')

const controllers = {}

controllers.registerUser = async (req, res) => {
  try {
    const { password } = req.body

    const hash = await hashPassword(password)

    await repo.createUser({
      ...req.body,
      password: hash
    })

    return res.status(201).json({ message: 'Successfully created user' })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = controllers
