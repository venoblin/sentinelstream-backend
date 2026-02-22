const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class DeviceFingerprint extends Model {}

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
      trustScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      tableName: 'deviceFingerprints'
    }
  )

  DeviceFingerprint.associate = (models) => {
    DeviceFingerprint.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })
  }

  return DeviceFingerprint
}
