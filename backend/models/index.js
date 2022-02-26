const Sequelize = require("sequelize")
const config = require("../config/config")[process.env.NODE_ENV]
const User = require("./user")

const db = {}
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

db.sequelize = sequelize
db.User = User

User.init(sequelize)

module.exports = db
