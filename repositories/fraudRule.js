const { FraudRule } = require('../models')

const repo = {}

repo.createFraudRule = async (fraudRulePayload) => {
  const fraudRule = await FraudRule.create(fraudRulePayload)

  return fraudRule
}

repo.findAllFraudRules = async () => {
  const fraudRules = await FraudRule.findAll()

  return fraudRules
}

repo.findFraudRuleById = async (id) => {
  const fraudRule = await FraudRule.findByPk(id)

  return fraudRule
}

module.exports = repo
