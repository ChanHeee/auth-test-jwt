const jwt = require("jsonwebtoken")

exports.isLoggedIn = (req, res, next) => {
  if (req.user) {
    console.log("\n\nisLoggedIn TRUE\n\n")
    next()
  } else {
    console.log("\n\nisLoggedIn FALSE\n\n")
    res.status(403).json({
      error: {
        message: "로그인 필요",
      },
    })
  }
}

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.user) {
    next()
  } else {
    res.status(403).json({
      error: {
        message: "이미 로그인한 상태입니다",
      },
    })
  }
}

exports.verifyToken = (req, res, next) => {
  try {
    req.user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    console.log("verifyToken success")
    next()
  } catch (error) {
    console.log("verify error", error.name)
    res.json({ success: false, message: error.name })
  }
}
