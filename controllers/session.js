const repo = require('../repositories/user')
const { sanitizeUser, decodeId } = require('../utils')

const controllers = {}

controllers.checkSession = async (req, res) => {
  try {
    const userId = res.locals.payload.id

    const decodedId = decodeId(userId)

    const user = await repo.findUserById(decodedId)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const sanitizedUser = sanitizeUser(user.toJSON())

    return res.status(200).json({
      user: sanitizedUser
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = controllers
