const { FraudRule, User } = require('../models')

const repo = {}

repo.createFraudRule = async (payload) => {
  const fraudRule = await FraudRule.create(payload)

  return fraudRule
}

repo.findAllFraudRules = async () => {
  const fraudRules = await FraudRule.findAll({
    include: [{ model: User, as: 'creator' }]
  })

  return fraudRules
}

repo.findFraudRuleById = async (id) => {
  const fraudRule = await FraudRule.findByPk(id, {
    include: [{ model: User, as: 'creator' }]
  })

  return fraudRule
}

module.exports = repo
