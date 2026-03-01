const { Model } = require('sequelize')
const { encodeId } = require('../utils')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toJSON() {
      const values = Object.assign({}, this.get())

      if (values.id) {
        values.id = encodeId(values.id)
      }

      return values
    }
  }

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
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 100
        }
      },
      role: {
        type: DataTypes.ENUM('user', 'analyst'),
        allowNull: false,
        defaultValue: 'user'
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
      as: 'auditLogs'
    })

    User.hasMany(models.Transaction, {
      foreignKey: 'userId',
      as: 'transactions'
    })

    User.hasMany(models.DeviceFingerprint, {
      foreignKey: 'userId',
      as: 'devices'
    })
  }

  return User
}
