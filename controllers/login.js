const repo = require('../repositories/user')
const { comparePassword, createToken } = require('../middlewares')
const { sanitizeUser } = require('../utils')

const controllers = {}

controllers.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await repo.findUserByEmail(email)

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const isAuthenticated = await comparePassword(password, user.password)

    if (isAuthenticated) {
      const payload = {
        id: user.id,
        role: user.role
      }

      const sanitizedUser = sanitizeUser(user)

      const token = createToken(payload)
      return res.status(200).json({ user: sanitizedUser, token })
    }

    return res.status(401).json({ error: 'Unauthorized' })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = controllers
