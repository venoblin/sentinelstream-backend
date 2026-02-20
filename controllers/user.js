const repo = require('../repositories/user')

const controllers = {}

controllers.getAllUsers = async (req, res) => {
  try {
    const users = await repo.findAllUsers(req.query)

    const cleanedUsers = users.map((user) => {
      delete user.dataValues.passwordHash

      return user
    })

    return res.status(200).json({ users: cleanedUsers })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

controllers.getUserById = async (req, res) => {
  try {
    const { id } = req.params

    const user = await repo.findUserById(id)

    delete user.dataValues.passwordHash

    return res.status(200).json({ user: user })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

controllers.patchUserById = async (req, res) => {
  try {
    const { id } = req.params

    const patchedUser = await repo.updateUserById(id, req.body)

    return res.status(200).json({ user: patchedUser })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = controllers
