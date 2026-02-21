const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD

module.exports = {
  development: {
    username: USERNAME,
    password: PASSWORD,
    database: 'sentinelstream_dev',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: USERNAME,
    password: PASSWORD,
    database: 'sentinelstream_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: USERNAME,
    password: PASSWORD,
    database: 'sentinelstream_prod',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
}
