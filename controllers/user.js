const repo = require('../repositories/user')

const controllers = {}

controllers.getAllUsers = async (req, res) => {
  try {
    const users = await repo.findAllUsers(req.query)

    return res.status(200).json({ users: users })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

controllers.getUserById = async (req, res) => {
  try {
    const { id } = req.params

    const user = await repo.findUserById(id)

    return res.status(200).json({ user: user })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = controllers
