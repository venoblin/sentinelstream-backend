'use strict'
require('dotenv').config()
const { faker } = require('@faker-js/faker')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = []
    const hash = await bcrypt.hash('password123', SALT_ROUNDS)

    for (let i = 1; i <= 24; i++) {
      const role = i % 12 === 11 || i % 12 === 0 ? 'analyst' : 'user'

      users.push({
        email: faker.internet.email(),
        password: hash,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        locationCity: faker.location.city(),
        locationCountry: faker.location.country(),
        riskScore: faker.number.int({ min: 1, max: 100 }),
        role: role,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    await queryInterface.bulkInsert('users', users, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
