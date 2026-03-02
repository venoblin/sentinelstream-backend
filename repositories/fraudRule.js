const { FraudRule, User } = require('../models')

const repo = {}

const include = [
  { model: User, as: 'creator' },
  { model: FraudRule, as: 'previousVersion' }
]

repo.createFraudRule = async (payload) => {
  const fraudRule = await FraudRule.create(payload)

  return fraudRule
}

repo.findAllFraudRules = async (options) => {
  const fraudRules = await FraudRule.findAll({
    include: include,
    where: { isActive: true, ...options }
  })

  return fraudRules
}

repo.findFraudRuleById = async (id) => {
  const fraudRule = await FraudRule.findByPk(id, {
    include: include
  })

  return fraudRule
}

repo.updateFraudRuleById = async (id, update) => {
  const [count] = await FraudRule.update(update, { where: { id: id } })

  return count
}

module.exports = repo
