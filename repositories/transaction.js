const { Transaction, User } = require('../models')

const repo = {}

repo.createTransaction = async (payload) => {
  const transaction = await Transaction.create(payload)

  return transaction
}

repo.findAllTransactions = async () => {
  const transactions = await Transaction.findAll({
    include: [{ model: User, as: 'user' }]
  })

  return transactions
}

repo.findTransactionById = async (id) => {
  const transaction = await Transaction.findByPk(id, {
    include: [{ model: User, as: 'user' }]
  })

  return transaction
}

module.exports = repo
