const { Transaction, User } = require('../models')

const repo = {}

const include = [{ model: User, as: 'user' }]

repo.createTransaction = async (payload) => {
  const transaction = await Transaction.create(payload)

  return transaction
}

repo.findAllTransactions = async (options) => {
  const transactions = await Transaction.findAll({
    include: include,
    where: options
  })

  return transactions
}

repo.findTransactionById = async (id) => {
  const transaction = await Transaction.findByPk(id, {
    include: include
  })

  return transaction
}

repo.updateTransactionById = async (id, update) => {
  const [count] = await Transaction.update(update, { where: { id: id } })

  return count
}

module.exports = repo
