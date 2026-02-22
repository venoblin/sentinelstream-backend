const utils = {}

utils.sanitizeUser = (user) => {
  return {
    id: user.id,
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
