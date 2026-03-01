const { Model } = require('sequelize')
const { encodeId } = require('../utils')

module.exports = (sequelize, DataTypes) => {
  class DeviceFingerprint extends Model {
    toJSON() {
      const values = Object.assign({}, this.get())

      if (values.id) {
        values.id = encodeId(values.id)
      }

      if (values.userId) {
        values.userId = encodeId(values.userId)
      }

      return values
    }
  }

  DeviceFingerprint.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      deviceHash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ipAddress: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userAgent: {
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
      isBanned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'DeviceFingerprint',
      tableName: 'device_fingerprints'
    }
  )

  DeviceFingerprint.associate = (models) => {
    DeviceFingerprint.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })

    DeviceFingerprint.hasMany(models.Transaction, {
      foreignKey: 'deviceFingerprintId',
      as: 'transactions'
    })
  }

  return DeviceFingerprint
}
