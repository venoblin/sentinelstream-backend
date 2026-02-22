const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      locationCity: {
        type: DataTypes.STRING,
        allowNull: false
      },
      locationCountry: {
        type: DataTypes.STRING,
        allowNull: false
      },
      riskScore: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('user', 'analyst'),
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    }
  )

  User.associate = (models) => {
    User.hasMany(models.FraudRule, {
      foreignKey: 'creatorId',
      as: 'createdFraudRules'
    })

    User.hasMany(models.AuditLog, {
      foreignKey: 'analystId',
      as: 'analyst'
    })

    User.hasMany(models.Transaction, {
      foreignKey: 'userId',
      as: 'user'
    })
  }

  return User
}
