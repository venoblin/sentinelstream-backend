const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_URI)

const models = {
  user: require('./user')(sequelize, DataTypes)
}

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

module.exports = { sequelize, ...models }
