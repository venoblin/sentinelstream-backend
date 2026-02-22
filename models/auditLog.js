const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class AuditLog extends Model {}

  AuditLog.init(
    {
      transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      analystId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      fraudRuleId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      actionsTaken: {
        type: DataTypes.ENUM(
          'SYSTEM_FLAGGED',
          'SYSTEM_BLOCKED',
          'INVESTIGATION_OPENED',
          'NOTE_ADDED',
          'ESCALATED',
          'CONFIRMED_FRAUD',
          'FALSE_POSITIVE'
        ),
        allowNull: false
      },
      actorName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'AuditLog',
      tableName: 'auditLogs'
    }
  )

  AuditLog.associate = (models) => {
    AuditLog.belongsTo(models.User, {
      foreignKey: 'analystId',
      as: 'analyst'
    })

    AuditLog.belongsTo(models.FraudRule, {
      foreignKey: 'fraudRuleId',
      as: 'fraudRule'
    })
  }

  return AuditLog
}
