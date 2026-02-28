'use strict'
const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [users] = await queryInterface.sequelize.query(
      'SELECT id FROM users;'
    )

    if (users.length === 0) return

    const devices = users.map((user) => ({
      userId: user.id,
      deviceHash: faker.string.alphanumeric(32),
      ipAddress: faker.internet.ipv4(),
      userAgent: faker.internet.userAgent(),
      riskScore: faker.number.int({ min: 0, max: 100 }),
      isBanned: faker.datatype.boolean({ probability: 0.1 }),
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    await queryInterface.bulkInsert('device_fingerprints', devices, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('device_fingerprints', null, {})
  }
}
