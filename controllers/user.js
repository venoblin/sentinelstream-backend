const repo = require('../repositories/user')

const controllers = {}

controllers.registerUser = async (req, res) => {
  try {
    let createdUser = await repo.createUser(req.body)

    delete createdUser.dataValues.passwordHash

    return res.status(201).json({ user: createdUser })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = controllers
