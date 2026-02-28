const Sqids = require('sqids').default

const utils = {}

const SQIDS_MIN_LENGTH = parseInt(process.env.SQIDS_MIN_LENGTH)

const sqids = new Sqids({
  alphabet: process.env.SQIDS_ALPHABET,
  minLength: SQIDS_MIN_LENGTH
})

utils.encodeId = (id) => {
  if (!id) return null
  return sqids.encode([id])
}

utils.decodeId = (encodedString) => {
  try {
    const numbers = sqids.decode(encodedString)
    return numbers.length > 0 ? numbers[0] : null
  } catch {
    return null
  }
}

utils.sanitizeUser = (user) => {
  const enocdedId = utils.encodeId(user.id)

  return {
    id: enocdedId,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    locationCity: user.locationCity,
    locationCountry: user.locationCountry,
    riskScore: user.riskScore,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
}

module.exports = utils
