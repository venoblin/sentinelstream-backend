const { DeviceFingerprint, User } = require('../models')

const repo = {}

const include = [{ model: User, as: 'user' }]

repo.createDeviceFingerprint = async (payload) => {
  const deviceFingerprint = await DeviceFingerprint.create(payload)

  return deviceFingerprint
}

repo.findAllDeviceFingerprints = async () => {
  const deviceFingerprints = await DeviceFingerprint.findAll({
    include: include
  })

  return deviceFingerprints
}

repo.findDeviceFingerprintById = async (id) => {
  const deviceFingerprint = await DeviceFingerprint.findByPk(id, {
    include: include
  })

  return deviceFingerprint
}

module.exports = repo
