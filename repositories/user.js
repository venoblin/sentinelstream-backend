const { User } = require('../models')

const repo = {}

repo.createUser = async (userPayload) => {
  const user = await User.create(userPayload)

  return user
}

module.exports = repo
