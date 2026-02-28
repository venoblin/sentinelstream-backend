const repo = require('../repositories/fraudRule')
const { sanitizeUser, encodeId } = require('../utils')

const controllers = {}

controllers.postFraudRule = async (req, res) => {
  try {
    const fraudRule = await repo.createFraudRule(req.body)

    return res
      .status(201)
      .json({ fraudRule: { ...fraudRule, id: encodeId(fraudRule.id) } })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

controllers.getAllFraudRules = async (req, res) => {
  try {
    const fraudRules = await repo.findAllFraudRules(req.query)

    const cleanedFraudRules = fraudRules.map((f) => {
      const plainFraudRule = f.toJSON()

      const fraudRule = {
        ...plainFraudRule,
        id: encodeId(plainFraudRule.id),
        creator: sanitizeUser(plainFraudRule.creator)
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
    const id = req.realId

    const fraudRule = await repo.findFraudRuleById(id)

    if (!fraudRule) {
      return res.status(404).json({ error: 'Not found' })
    }

    const plainFraudRule = fraudRule.toJSON()

    return res.status(200).json({
      fraudRule: {
        ...plainFraudRule,
        id: encodeId(plainFraudRule.id),
        creator: sanitizeUser(plainFraudRule.creator)
      }
    })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

controllers.patchFraudRuleById = async (req, res) => {
  try {
    const id = req.realId

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
