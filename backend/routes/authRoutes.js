const express = require("express")
const bcrypt = require("bcrypt")
const { isNotLoggedIn, verifyToken } = require("../middlewares/authMiddlewares")
const { User } = require("../models")
const {
  getAccessToken,
  getRefreshToken,
  isTokenValid,
} = require("../utils/jwt-utils")
const router = express.Router()

//* desc    Create User
//* route   /auth/join
//* access  Not Logged in
router.post("/join", isNotLoggedIn, async (req, res) => {
  try {
    const { email, nick, password } = req.body
    const exUser = await User.findOne({ where: { email } })
    if (exUser) {
      return res.send("This email is already registered.")
    } else {
      const exNick = await User.findOne({ where: { nick } })
      if (exNick) {
        return res.send("this nickname is already using")
      } else {
        const newUser = await User.create({
          email,
          nick,
          password: bcrypt.hashSync(password, 10),
        })
        res.json({ success: true, user: newUser })
      }
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router

//* desc    Login User
//* route   /auth/login
//* access  Not Logged in
router.post("/login", isNotLoggedIn, async (req, res) => {
  try {
    const { email, password: inputPw } = req.body
    const user = await User.findOne({
      where: { email },
    })
    if (user) {
      const passwordCheck = bcrypt.compareSync(inputPw, user.password)
      if (passwordCheck) {
        req.user = user
        const accessToken = getAccessToken(user)
        const refreshToken = getRefreshToken()
        res.cookie("accessToken", accessToken)
        res.cookie("refreshToken", refreshToken)
        res.json({ success: true, user })
      } else {
        return res.send("Password does not match.")
      }
    } else {
      return res.send("Email does not exist.")
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
})

//* desc    Check if user login
//* route   /auth/logincheck
//* access  Public
router.get("/logincheck", verifyToken, (req, res) => {
  const user = req.user
  console.log("/logincheck", req.user)
  delete user["iat"]
  delete user["exp"]
  return res.json({ success: true, user })
})

//* desc    Logout User
//* route   /auth/logout
//* access  Logged in
router.get("/logout", (req, res) => {
  res.clearCookie("accessToken")
  res.json({ success: true })
})

//* desc    Update accessToken
//* route   /auth/refresh
//* access  Public
router.get("/refresh", (req, res) => {
  const accessToken = isTokenValid(req.headers.authorization)
  console.log(accessToken, "dads")
  if (accessToken) {
    const newAccessToken = getAccessToken({
      id: 1,
      nick: "test",
      email: "test@gmail.com",
    })
    res.cookie("accessToken", newAccessToken)
    res.json({ success: true })
  } else {
    console.log("accessToken FALSE")
    res.json({ success: true, isValid: false })
  }
})
