require("dotenv").config()

const env = process.env

const development = {
  username: "root",
  password: env.MYSQL_PASSWORD,
  database: "auth-app",
  host: "127.0.0.1",
  dialect: "mysql",
}

module.exports = { development }
