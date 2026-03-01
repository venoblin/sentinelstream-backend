const { Model } = require('sequelize')
const { encodeId } = require('../utils')

module.exports = (sequelize, DataTypes) => {
  class FraudRule extends Model {
    toJSON() {
      const values = Object.assign({}, this.get())

      if (values.id) {
        values.id = encodeId(values.id)
      }

      if (values.creatorId) {
        values.creatorId = encodeId(values.creatorId)
      }

      if (values.previousVersionId) {
        values.previousVersionId = encodeId(values.previousVersionId)
      }

      return values
    }
  }

  FraudRule.init(
    {
      ruleName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      riskScoreImpact: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 100
        }
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      logicJson: {
        type: DataTypes.JSON,
        allowNull: false
      },
      creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      version: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      previousVersionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'fraud_rules',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'FraudRule',
      tableName: 'fraud_rules'
    }
  )

  FraudRule.associate = (models) => {
    FraudRule.belongsTo(models.User, {
      foreignKey: 'creatorId',
      as: 'creator'
    })

    FraudRule.hasMany(models.AuditLog, {
      foreignKey: 'fraudRuleId',
      as: 'auditLogs'
    })

    FraudRule.belongsTo(models.FraudRule, {
      foreignKey: 'previousVersionId',
      as: 'previousVersion'
    })

    FraudRule.hasOne(models.FraudRule, {
      foreignKey: 'previousVersionId',
      as: 'nextVersion'
    })
  }

  return FraudRule
}
