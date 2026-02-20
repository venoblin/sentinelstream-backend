const repo = require('../repositories/fraudRule')

const controllers = {}

controllers.postFraudRule = async (req, res) => {
  try {
    const createdFraudRule = await repo.createFraudRule(req.body)

    return res.status(201).json({ fraudRule: createdFraudRule })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = controllers
