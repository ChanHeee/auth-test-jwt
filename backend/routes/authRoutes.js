const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { isNotLoggedIn } = require("../middlewares/authMiddlewares")
const { User } = require("../models")
const { generateToken } = require("../utils/generateToken")
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
        const token = generateToken(user.id, user.email, user.nick)
        res.cookie("token", token, {
          maxAge: 1000 * 60 * 60,
        })
        console.log(token)
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
router.get("/logincheck", (req, res) => {
  try {
    const user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    req.user = user
    console.log("\n\n\n", req.user, "\n\n\n")
    delete user["iat"]
    delete user["exp"]
    return res.json({ success: true, user })
  } catch {
    res.json({ success: false })
  }
})

//* desc    Logout User
//* route   /auth/logout
//* access  Logged in
router.get("/logout", (req, res) => {
  res.clearCookie("token")
  res.json({ success: true })
})
