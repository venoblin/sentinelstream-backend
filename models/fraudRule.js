const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class FraudRule extends Model {}

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
          model: 'User',
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
          model: 'FraudRule',
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
