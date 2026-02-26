const controllers = {}

controllers.checkSession = async (req, res) => {
  try {
    return res.status(201).json({ user: 'Session' })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = controllers
