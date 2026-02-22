const repo = require('../repositories/fraudRule')
const { sanitizeUser } = require('../utils')

const controllers = {}

controllers.postFraudRule = async (req, res) => {
  try {
    const fraudRule = await repo.createFraudRule(req.body)

    return res.status(201).json({ fraudRule: fraudRule })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

controllers.getAllFraudRules = async (req, res) => {
  try {
    const fraudRules = await repo.findAllFraudRules()

    const cleanedFraudRules = fraudRules.map((f) => {
      const plainFraudRules = f.toJSON()

      const fraudRule = {
        ...plainFraudRules,
        user: sanitizeUser(f.user)
      }

      return fraudRule
    })

    return res.status(200).json({ fraudRules: cleanedFraudRules })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

controllers.getFraudRuleById = async (req, res) => {
  try {
    const { id } = req.params

    const fraudRule = await repo.findFraudRuleById(id)

    if (!fraudRule) {
      return res.status(404).json({ error: 'Not found' })
    }

    const plainFraudRule = fraudRule.toJSON()

    return res.status(200).json({
      fraudRule: {
        ...plainFraudRule,
        user: sanitizeUser(plainFraudRule.user)
      }
    })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

controllers.patchFraudRuleById = async (req, res) => {
  try {
    const { id } = req.params

    const oldRule = await repo.findFraudRuleById(id)

    if (!oldRule) {
      return res.status(404).json({ error: 'Not found' })
    }

    const createdFraudRule = await repo.createFraudRule({
      creatorId: oldRule.creatorId,
      ruleName: oldRule.ruleName,
      riskScoreImpact: oldRule.riskScoreImpact,
      isActive: true,
      logicJson: oldRule.logicJson,
      version: oldRule.version + 1,
      previousVersionId: oldRule.id,
      ...req.body
    })

    await repo.updateFraudRuleById(id, {
      isActive: false
    })

    return res.status(200).json({ fraudRule: createdFraudRule })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = controllers
