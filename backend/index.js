const express = require("express")
const session = require("express-session")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")

const indexRouter = require("./routes/indexRoutes")

dotenv.config()

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
)

app.use("/", indexRouter)

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  res.send(`<h1>${err.message}</h1>
        <h2>${err.status}</h2>
        <pre>${err.stack}</pre>`)
})

app.listen(process.env.NODE_PORT || 5000, () => {
  console.log(`${process.env.PORT || 5000}번 포트에서 대기 중`)
})
