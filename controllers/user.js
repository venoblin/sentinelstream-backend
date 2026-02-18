const repo = require('../repositories/user')

const controllers = {}

controllers.registerUser = async (req, res) => {
  try {
    const createdUser = repo.createUser(req.body)

    return res.status(200).json({ user: createdUser })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = controllers
