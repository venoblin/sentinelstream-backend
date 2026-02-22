const repo = require('../repositories/fraudRule')

const controllers = {}

controllers.postFraudRule = async (req, res) => {
  try {
    const createdFraudRule = await repo.createFraudRule(req.body)

    return res.status(201).json({ fraudRule: createdFraudRule })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

controllers.getAllFraudRules = async (req, res) => {
  try {
    const allFraudRules = await repo.findAllFraudRules()

    return res.status(200).json({ fraudRules: allFraudRules })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

controllers.getFraudRuleById = async (req, res) => {
  try {
    const { id } = req.params

    const allFraudRules = await repo.findFraudRuleById(id)

    return res.status(200).json({ fraudRules: allFraudRules })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = controllers
