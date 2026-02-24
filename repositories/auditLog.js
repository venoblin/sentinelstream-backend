const { AuditLog, Transaction, User, FraudRule } = require('../models')

const repo = {}

const include = [
  { model: Transaction, as: 'transaction' },
  { model: User, as: 'analyst' },
  { model: FraudRule, as: 'fraudRule' }
]

repo.createAuditLog = async (payload) => {
  const auditLog = await AuditLog.create(payload)

  return auditLog
}

repo.findAllAuditLogs = async (options) => {
  const auditLogs = await AuditLog.findAll({
    include: include,
    where: { isActive: true, ...options }
  })

  return auditLogs
}

repo.findAuditLogById = async (id) => {
  const auditLog = await AuditLog.findByPk(id, {
    include: include
  })

  return auditLog
}

module.exports = repo
