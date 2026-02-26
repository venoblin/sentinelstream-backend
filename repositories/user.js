const {
  User,
  Transaction,
  DeviceFingerprint,
  FraudRule,
  AuditLog
} = require('../models/index')

const repo = {}

const include = [
  { model: Transaction, as: 'transactions' },
  { model: DeviceFingerprint, as: 'devices' },
  { model: FraudRule, as: 'createdFraudRules' },
  { model: AuditLog, as: 'auditLogs' }
]

repo.createUser = async (payload) => {
  const user = await User.create(payload)

  return user
}

repo.findAllUsers = async (options) => {
  const users = await User.findAll({
    include: include,
    where: { isActive: true, ...options }
  })

  return users
}

repo.findUserById = async (id) => {
  const user = await User.findByPk(id, {
    include: include
  })

  return user
}

repo.updateUserById = async (id, update) => {
  const [count] = await User.update(update, { where: { id: id } })

  return count
}

repo.findUserByEmail = async (email) => {
  const user = await User.findOne({
    include: include,
    where: { email: email }
  })

  return user
}

module.exports = repo
