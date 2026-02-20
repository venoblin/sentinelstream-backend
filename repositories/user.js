const { User } = require('../models')

const repo = {}

repo.createUser = async (userPayload) => {
  const user = await User.create(userPayload)

  return user
}

repo.findAllUsers = async (options) => {
  const users = await User.findAll({ where: { ...options } })

  return users
}

repo.findUserById = async (id) => {
  const user = await User.findByPk(id)

  return user
}

module.exports = repo
