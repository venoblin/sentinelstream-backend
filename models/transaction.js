const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {}

  Transaction.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
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
  }

  return Transaction
}
