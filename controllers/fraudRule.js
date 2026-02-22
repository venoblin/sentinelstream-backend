const repo = require('../repositories/fraudRule')

const controllers = {}

controllers.postFraudRule = async (req, res) => {
  try {
    const createdFraudRule = await repo.createFraudRule(req.body)

    return res.status(201).json({ fraudRule: createdFraudRule })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

controllers.getAllFraudRules = async (req, res) => {
  try {
    const allFraudRules = await repo.findAllFraudRules()

    return res.status(200).json({ fraudRules: allFraudRules })
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

    return res.status(200).json({ fraudRule: fraudRule })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = controllers
