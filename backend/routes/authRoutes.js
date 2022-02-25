const express = require("express")
const bcrypt = require("bcrypt")
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
      return res.json({
        error: {
          message: "이미 가입된 사용자입니다.",
        },
      })
    } else {
      const exNick = await User.findOne({ where: { nick } })
      if (exNick) {
        return res.json({
          error: {
            message: "이미 사용 중인 닉네임입니다.",
          },
        })
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
        const token = generateToken(user.id, user.email, user.nick)
        res.cookie("token", token, {
          maxAge: 1000 * 60 * 60,
        })
        res.json({ success: true, user })
      } else {
        return res.send("비밀번호를 잘못 입력했습니다.")
      }
    } else {
      return res.send("가입되지 않은 아이디입니다.")
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
})
