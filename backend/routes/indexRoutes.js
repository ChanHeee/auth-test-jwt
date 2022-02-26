const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
  res.json({ data: 3 })
})

module.exports = router
