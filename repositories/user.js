const { User, Transaction } = require('../models/index')

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
  const user = await User.findByPk(id, {
    include: [{ model: Transaction, as: 'transactions' }]
  })

  return user
}

repo.updateUserById = async (id, update) => {
  const [count] = await User.update(update, { where: { id: id } })

  return count
}

repo.findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email: email } })

  return user
}

module.exports = repo
