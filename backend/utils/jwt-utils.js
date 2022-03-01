const jwt = require("jsonwebtoken")

module.exports = {
  getAccessToken: (user) => {
    return jwt.sign(
      { id: user.id, email: user.email, nick: user.nick },
      process.env.JWT_SECRET,
      {
        expiresIn: "10s",
      }
    )
  },
  getRefreshToken: () => {
    return jwt.sign({}, process.env.JWT_SECRET, {
      expiresIn: "14d",
    })
  },
  isTokenValid: (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      return true
    } catch (error) {
      if (error.name == "TokenExpiredError") {
        return true
      } else {
        return false
      }
    }
  },
}
