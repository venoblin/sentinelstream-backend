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
  } catch {
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

    if (!transaction) {
      return res.status(404).json({ error: 'Not found' })
    }

    const plainTransaction = transaction.toJSON()

    return res.status(200).json({
      transaction: {
        ...plainTransaction,
        user: sanitizeUser(plainTransaction.user)
      }
    })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

controllers.patchTransactionById = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!status) {
      return res
        .status(400)
        .json({ error: 'No valid fields provided for update' })
    }

    const count = await repo.updateTransactionById(id, { status: status })

    if (!count) {
      return res.status(404).json({ error: 'Not found' })
    }

    return res.status(200).json({ message: 'Successfully updated transaction' })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = controllers
