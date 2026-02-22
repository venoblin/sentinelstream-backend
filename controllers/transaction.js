const repo = require('../repositories/transaction')
const { sanitizeUser } = require('../utils')

const controllers = {}

controllers.getAllTransactions = async (req, res) => {
  try {
    const transactions = await repo.findAllTransactions()

    const cleanedTransactions = transactions.map((t) => {
      const plainTransaction = t.toJSON()

      const transaction = {
        ...plainTransaction,
        user: sanitizeUser(t.user)
      }

      return transaction
    })

    return res.status(200).json({ transactions: cleanedTransactions })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

controllers.postTransaction = async (req, res) => {
  try {
    const transaction = await repo.createTransaction(req.body)

    return res.status(201).json({ transaction: transaction })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

controllers.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params

    const transaction = await repo.findTransactionById(id)

    const plainTransaction = transaction.toJSON()

    return res.status(201).json({
      transaction: {
        ...plainTransaction,
        user: sanitizeUser(plainTransaction.user)
      }
    })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = controllers
