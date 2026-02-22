const { DeviceFingerprint, User } = require('../models')

const repo = {}

repo.createDeviceFingerprint = async (payload) => {
  const deviceFingerprint = await DeviceFingerprint.create(payload)

  return deviceFingerprint
}

repo.findAllDeviceFingerprints = async () => {
  const deviceFingerprints = await DeviceFingerprint.findAll({
    include: [{ model: User, as: 'user' }]
  })

  return deviceFingerprints
}

repo.findDeviceFingerprintById = async (id) => {
  const deviceFingerprint = await DeviceFingerprint.findByPk(id, {
    include: [{ model: User, as: 'user' }]
  })

  return deviceFingerprint
}

module.exports = repo
