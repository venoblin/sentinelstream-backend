'use strict'
/** @type {import('sequelize-cli').Migration} */

const { faker } = require('@faker-js/faker')
const bcrypt = require('bcrypt')

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = []
    const hash = await bcrypt.hash('password123', process.env.SALT_ROUNDS)

    for (let i = 0; i < 10; i++) {
      users.push({
        email: faker.internet.email(),
        password: hash,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        locationCity: faker.location.city(),
        locationCountry: faker.location.country(),
        riskScore: faker.number.int({ min: 1, max: 100 }),
        role: i % 2 === 0 ? 'user' : 'analyst',
        isActive: true
      })
    }

    await queryInterface.bulkInsert('Users', users, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
