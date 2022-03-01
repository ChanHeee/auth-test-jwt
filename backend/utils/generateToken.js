const jwt = require("jsonwebtoken")

exports.generateToken = (id, email, nick) => {
  console.log(process.env.JWT_SECRET)
  return jwt.sign({ id, email, nick }, process.env.JWT_SECRET, {
    expiresIn: "10s",
  })
}
