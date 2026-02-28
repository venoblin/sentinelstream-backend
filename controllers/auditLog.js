const repo = require('../repositories/auditLog')
const { sanitizeUser, encodeId } = require('../utils')

const controllers = {}

controllers.postAuditLog = async (req, res) => {
  try {
    const auditLog = await repo.createAuditLog(req.body)

    return res
      .status(201)
      .json({ auditLog: { ...auditLog, id: encodeId(auditLog.id) } })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

controllers.getAllAuditLogs = async (req, res) => {
  try {
    const auditLogs = await repo.findAllAuditLogs(req.query)

    const cleanedAuditLogs = auditLogs.map((a) => {
      const plainAuditLog = a.toJSON()

      return {
        ...plainAuditLog,
        id: encodeId(plainAuditLog.id),
        analyst: sanitizeUser(plainAuditLog.analyst)
      }
    })

    return res.status(200).json({ auditLogs: cleanedAuditLogs })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

controllers.getAuditLogById = async (req, res) => {
  try {
    const { id } = req.params

    const auditLog = await repo.findAuditLogById(id)

    if (!auditLog) {
      return res.status(404).json({ error: 'Not Found' })
    }

    const plainAuditLog = auditLog.toJSON()

    return res.status(200).json({
      auditLogs: {
        ...plainAuditLog,
        id: encodeId(plainAuditLog.id),
        analyst: sanitizeUser(plainAuditLog.analyst)
      }
    })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = controllers
