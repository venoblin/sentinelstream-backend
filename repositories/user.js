const { User } = require('../models')

const repo = {}

repo.createUser = async (userPayload) => {
  const user = await User.create(userPayload)

  delete user.dataValues.passwordHash

  return user
}

module.exports = repo
