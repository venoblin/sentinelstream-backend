const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const APP_SECRET = process.env.APP_SECRET

const middlewares = {}

middlewares.hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS)
  return hash
}

middlewares.comparePassword = async (password, storedPassword) => {
  const match = await bcrypt.compare(password, storedPassword)
  return match
}

middlewares.createToken = (payload) => {
  const token = jwt.sign(payload, APP_SECRET)
  return token
}

middlewares.verifyToken = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' })
  }

  try {
    const payload = jwt.verify(token, APP_SECRET)
    if (payload) {
      res.locals.payload = payload
      return next()
    }

    return res.status(401).json({ error: 'Unauthorized' })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

middlewares.verifyAnalyst = (req, res, next) => {
  try {
    const { payload } = res.locals

    if (payload && payload.role === 'analyst') {
      return next()
    }

    return res.status(403).json({ error: 'Forbidden' })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

middlewares.verifyUserId = (req, res, next) => {
  try {
    const { payload } = res.locals
    const { id } = req.params

    if (payload && payload.id === parseInt(id)) {
      return next()
    }

    return res.status(403).json({ error: 'Forbidden' })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = middlewares
