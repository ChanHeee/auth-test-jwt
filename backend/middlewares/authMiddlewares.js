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
