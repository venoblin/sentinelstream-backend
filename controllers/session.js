const repo = require('../repositories/user')
const { sanitizeUser } = require('../utils')

const controllers = {}

controllers.checkSession = async (req, res) => {
  try {
    const userId = res.locals.payload.id

    const user = await repo.findUserById(userId)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const sanitizedUser = sanitizeUser(user)

    return res.status(200).json({
      user: {
        ...sanitizedUser,
        transactions: user.transactions,
        devices: user.devices,
        createdFraudRules: user.createdFraudRules,
        auditLogs: user.auditLogs
      }
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = controllers
