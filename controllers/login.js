const repo = require('../repositories/user')
const { comparePassword, createToken } = require('../middlewares')

const controllers = {}

controllers.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await repo.findUserByEmail(email)

    const isAuthenticated = await comparePassword(password, user.password)

    if (isAuthenticated) {
      const payload = {
        id: user.id,
        email: user.email
      }

      const token = createToken(payload)
      return res.status(201).json({ user: payload, token })
    }

    return res.status(401).json({ error: 'Unauthorized' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = controllers
