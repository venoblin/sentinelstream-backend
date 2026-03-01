const { Model } = require('sequelize')
const { encodeId } = require('../utils')

module.exports = (sequelize, DataTypes) => {
  class AuditLog extends Model {
    toJSON() {
      const values = Object.assign({}, this.get())

      if (values.id) {
        values.id = encodeId(values.id)
      }

      if (values.transactionId) {
        values.transactionId = encodeId(values.transactionId)
      }

      if (values.analystId) {
        values.analystId = encodeId(values.analystId)
      }

      if (values.fraudRuleId) {
        values.fraudRuleId = encodeId(values.fraudRuleId)
      }

      return values
    }
  }

  AuditLog.init(
    {
      transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'transactions',
          key: 'id'
        }
      },
      analystId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      fraudRuleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'fraud_rules',
          key: 'id'
        }
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
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'AuditLog',
      tableName: 'audit_logs'
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

    AuditLog.belongsTo(models.Transaction, {
      foreignKey: 'transactionId',
      as: 'transaction'
    })
  }

  return AuditLog
}
