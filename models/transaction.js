const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {}

  Transaction.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      deviceFingerprintId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'device_fingerprints', key: 'id' }
      },
      transactionChannel: {
        type: DataTypes.ENUM(
          'WEB',
          'MOBILE_APP',
          'ATM',
          'BRANCH',
          'POS_TERMINAL',
          'RECURRING_SERVER'
        ),
        allowNull: false
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false
      },
      merchant: {
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
      status: {
        type: DataTypes.ENUM(
          'PENDING',
          'APPROVED',
          'FLAGGED',
          'BLOCKED',
          'REVERSED'
        ),
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
      }
    },
    {
      sequelize,
      modelName: 'Transaction',
      tableName: 'transactions'
    }
  )

  Transaction.associate = (models) => {
    Transaction.hasMany(models.AuditLog, {
      foreignKey: 'transactionId',
      as: 'auditLogs'
    })

    Transaction.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })

    Transaction.belongsTo(models.DeviceFingerprint, {
      foreignKey: 'deviceFingerprintId',
      as: 'deviceFingerprint'
    })
  }

  return Transaction
}
