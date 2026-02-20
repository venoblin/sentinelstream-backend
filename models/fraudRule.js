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
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
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
      }
    },
    {
      sequelize,
      modelName: 'FraudRule',
      tableName: 'fraudRules'
    }
  )

  FraudRule.associate = (models) => {
    FraudRule.belongsTo(models.User, {
      foreignKey: 'creatorId',
      as: 'creator'
    })
  }

  return FraudRule
}
