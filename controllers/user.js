const repo = require('../repositories/user')
const { sanitizeUser } = require('../utils')

const controllers = {}

controllers.getAllUsers = async (req, res) => {
  try {
    const users = await repo.findAllUsers(req.query)

    const cleanedUsers = users.map((u) => {
      const user = u.toJSON()
      return sanitizeUser(user)
    })

    return res.status(200).json({ users: cleanedUsers })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

controllers.getUserById = async (req, res) => {
  try {
    const id = req.realId

    const user = await repo.findUserById(id)

    if (!user) {
      return res.status(404).json({ error: 'Not found' })
    }

    const cleanedUser = sanitizeUser(user.toJSON())

    return res
      .status(200)
      .json({ user: { ...cleanedUser, transactions: user.transactions } })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

controllers.patchUserById = async (req, res) => {
  try {
    const id = req.realId

    const count = await repo.updateUserById(id, req.body)

    if (!count) {
      return res.status(404).json({ error: 'Not found' })
    }

    return res.status(200).json({ message: 'Successfully updated user' })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

controllers.deleteUserById = async (req, res) => {
  try {
    const id = req.realId

    const count = await repo.updateUserById(id, {
      email: `deleted-${id}@anonymized.local`,
      firstName: 'Deleted',
      lastName: 'User',
      password: 'DELETED_ACCOUNT_NO_ACCESS',
      locationCity: 'REDACTED',
      isActive: false
    })

    if (!count) {
      return res.status(404).json({ error: 'Not Found' })
    }

    return res.status(200).json({ message: 'Successfully updated user' })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = controllers
