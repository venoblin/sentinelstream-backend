const { FraudRule, User } = require('../models')

const repo = {}

repo.createFraudRule = async (payload) => {
  const fraudRule = await FraudRule.create(payload)

  return fraudRule
}

repo.findAllFraudRules = async (options) => {
  const fraudRules = await FraudRule.findAll({
    include: [{ model: User, as: 'creator' }],
    where: { isActive: true, ...options }
  })

  return fraudRules
}

repo.findFraudRuleById = async (id) => {
  const fraudRule = await FraudRule.findByPk(id, {
    include: [{ model: User, as: 'creator' }]
  })

  return fraudRule
}

repo.updateFraudRuleById = async (id, update) => {
  const [count] = await FraudRule.update(update, { where: { id: id } })

  return count
}

module.exports = repo
