const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init({})

  return User
}
