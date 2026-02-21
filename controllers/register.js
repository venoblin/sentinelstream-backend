const repo = require('../repositories/user')
const { hashPassword } = require('../middlewares')

const controllers = {}

controllers.registerUser = async (req, res) => {
  try {
    const { password } = req.body

    const hash = await hashPassword(password)

    let createdUser = await repo.createUser({
      ...req.body,
      password: hash
    })

    delete createdUser.dataValues.password

    return res.status(201).json({ user: createdUser })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = controllers
