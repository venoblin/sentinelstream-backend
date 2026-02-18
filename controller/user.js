const controllers = {}

controllers.registerUser = async (req, res) => {
  try {
    return res.status(200).json({ user: 'user created' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = controllers
