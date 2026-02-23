const repo = require('../repositories/deviceFingerprint')
const { sanitizeUser } = require('../utils')

const controllers = {}

controllers.postDeviceFingerprint = async (req, res) => {
  try {
    const deviceFingerprint = await repo.createDeviceFingerprint(req.body)

    return res.status(201).json({ deviceFingerprint: deviceFingerprint })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

controllers.getAllDeviceFingerprints = async (req, res) => {
  try {
    const deviceFingerprints = await repo.findAllDeviceFingerprints()

    const cleanedDeviceFingerprints = deviceFingerprints.map((d) => {
      const plainDeviceFingerprints = d.toJSON()

      const deviceFingerprint = {
        ...plainDeviceFingerprints,
        user: sanitizeUser(d.user)
      }

      return deviceFingerprint
    })

    return res
      .status(200)
      .json({ deviceFingerprints: cleanedDeviceFingerprints })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

controllers.getDeviceFingerprintById = async (req, res) => {
  try {
    const { id } = req.params

    const deviceFingerprint = await repo.findDeviceFingerprintById(id)

    if (!deviceFingerprint) {
      return res.status(404).json({ error: 'Not found' })
    }

    const plainDeviceFingerprint = deviceFingerprint.toJSON()

    return res.status(200).json({
      deviceFingerprint: {
        ...plainDeviceFingerprint,
        user: sanitizeUser(plainDeviceFingerprint.user)
      }
    })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

controllers.patchDeviceFingerprintById = async (req, res) => {
  try {
    const { id } = req.params

    const count = await repo.updateDeviceFingerprintById(id, req.body)

    if (!count) {
      return res.status(404).json({ error: 'Not found' })
    }

    return res
      .status(200)
      .json({ message: 'Successfully updated device fingerprint' })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = controllers
