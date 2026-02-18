const { User } = require('../models')

const repo = {}

repo.createUser = async (userPayload) => {
  const user = User.create(userPayload)

  return user
}

module.exports = repo
