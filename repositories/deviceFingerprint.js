const { DeviceFingerprint, User } = require('../models')

const repo = {}

const include = [{ model: User, as: 'user' }]

repo.createDeviceFingerprint = async (payload) => {
  const deviceFingerprint = await DeviceFingerprint.create(payload)

  return deviceFingerprint
}

repo.findAllDeviceFingerprints = async (options) => {
  const deviceFingerprints = await DeviceFingerprint.findAll({
    include: include,
    where: { isBanned: false, ...options }
  })

  return deviceFingerprints
}

repo.findDeviceFingerprintById = async (id) => {
  const deviceFingerprint = await DeviceFingerprint.findByPk(id, {
    include: include
  })

  return deviceFingerprint
}

repo.updateDeviceFingerprintById = async (id, update) => {
  const [count] = await DeviceFingerprint.update(id, {
    where: { id: id }
  })

  return count
}

module.exports = repo
