const repo = require('../repositories/user')
const { comparePassword, createToken } = require('../middlewares')
const { sanitizeUser, encodeId } = require('../utils')

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
        id: encodeId(user.id),
        role: user.role
      }

      const sanitizedUser = sanitizeUser(user.toJSON())

      const token = createToken(payload)

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
      })

      return res.status(200).json({
        user: {
          ...sanitizedUser,
          transactions: user.transactions,
          devices: user.devices,
          createdFraudRules: user.createdFraudRules,
          auditLogs: user.auditLogs
        }
      })
    }

    return res.status(401).json({ error: 'Unauthorized' })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = controllers
