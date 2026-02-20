const { FraudRule } = require('../models')

const repo = {}

repo.createFraudRule = async (fraudRulePayload) => {
  const fraudRule = await FraudRule.create(fraudRulePayload)

  return fraudRule
}

module.exports = repo
