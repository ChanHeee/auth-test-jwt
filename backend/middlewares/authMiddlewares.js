exports.isLoggedIn = (req, res, next) => {
  if (req.user) {
    next()
  } else {
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
