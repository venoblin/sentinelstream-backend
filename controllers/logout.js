const controllers = {}

controllers.logoutUser = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })

    return res.status(200).json({ message: 'Successfully logged out user' })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = controllers
