const repo = require('../repositories/deviceFingerprint')
const { sanitizeUser, encodeId } = require('../utils')

const controllers = {}

controllers.postDeviceFingerprint = async (req, res) => {
  try {
    const deviceFingerprint = await repo.createDeviceFingerprint(req.body)

    return res.status(201).json({
      deviceFingerprint: {
        ...deviceFingerprint,
        id: encodeId(deviceFingerprint.id)
      }
    })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

controllers.getAllDeviceFingerprints = async (req, res) => {
  try {
    const deviceFingerprints = await repo.findAllDeviceFingerprints()

    const cleanedDeviceFingerprints = deviceFingerprints.map((d) => {
      const plainDeviceFingerprint = d.toJSON()

      const deviceFingerprint = {
        ...plainDeviceFingerprint,
        id: encodeId(plainDeviceFingerprint.id),
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
    const id = req.realId

    const deviceFingerprint = await repo.findDeviceFingerprintById(id)

    if (!deviceFingerprint) {
      return res.status(404).json({ error: 'Not found' })
    }

    const plainDeviceFingerprint = deviceFingerprint.toJSON()

    return res.status(200).json({
      deviceFingerprint: {
        ...plainDeviceFingerprint,
        id: encodeId(plainDeviceFingerprint.id),
        user: sanitizeUser(plainDeviceFingerprint.user)
      }
    })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

controllers.patchDeviceFingerprintById = async (req, res) => {
  try {
    const id = req.realId
    const { trustScore, isBanned, lastSeen } = req.body

    const updates = {}

    if (trustScore !== undefined) {
      updates.trustScore = trustScore
    }

    if (isBanned !== undefined) {
      updates.isBanned = isBanned
    }

    if (lastSeen !== undefined) {
      updates.lastSeen = lastSeen
    }

    if (!Object.keys(updates).length) {
      return res
        .status(400)
        .json({ error: 'No valid fields provided for update' })
    }

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

controllers.deleteDeviceFingerprintById = async (req, res) => {
  try {
    const id = req.realId

    const count = await repo.updateDeviceFingerprintById(id, {
      ipAddress: 'REDACTED '
    })

    if (!count) {
      return res.status(404).json({ error: 'Not found' })
    }

    return res
      .status(200)
      .json({ message: 'Successfully deleted device fingerprint' })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = controllers
