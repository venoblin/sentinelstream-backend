const { User } = require('../models')

const repo = {}

repo.createUser = async (payload) => {
  const user = await User.create(payload)

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

repo.updateUserById = async (id, update) => {
  const [count] = await User.update(update, { where: { id: id } })

  if (count) {
    return 'Successfully updated user'
  }

  throw new Error("Couldn't find user")
}

repo.findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email: email } })

  if (user) {
    return user
  }

  throw new Error("Couldn't find user")
}

module.exports = repo
