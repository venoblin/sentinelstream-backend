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

middlewares.stripToken = (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1]
    if (token) {
      res.locals.token = token
      return next()
    }
  } catch {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

middlewares.verifyToken = (req, res, next) => {
  const { token } = res.locals
  try {
    const payload = jwt.verify(token, APP_SECRET)
    if (payload) {
      res.locals.payload = payload
      return next()
    }

    return res.status(401).json({ error: 'Unauthorized' })
  } catch {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

middlewares.verifyRole = (requiredRole) => {
  return (req, res, next) => {
    try {
      const { payload } = res.locals

      if (payload && payload.role === requiredRole) {
        return next()
      }

      return res.status(403).json({ error: 'Forbidden' })
    } catch {
      return res.status(403).json({ error: 'Forbidden' })
    }
  }
}

middlewares.verifyUser = (req, res, next) => {
  try {
    const { payload } = res.locals
    const { id } = res.params

    if (payload && payload.id === id) {
      return next()
    }

    return res.status(403).json({ error: 'Unauthorized' })
  } catch {
    return res.status(403).json({ error: 'Unauthorized' })
  }
}

module.exports = middlewares
