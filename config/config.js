require('dotenv').config()

const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD
const DIALECT = process.env.DB_DIALECT
const DATABASE = process.env.DB_DATABASE
const HOST = process.env.DB_HOST

module.exports = {
  development: {
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    host: HOST,
    dialect: DIALECT
  },
  test: {
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    host: HOST,
    dialect: DIALECT
  },
  production: {
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    host: HOST,
    dialect: DIALECT,
    logging: false
  }
}
