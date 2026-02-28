'use strict'
const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE role = 'user';`
    )
    const [devices] = await queryInterface.sequelize.query(
      `SELECT id, "userId" FROM device_fingerprints;`
    )

    if (users.length === 0) return

    const channels = [
      'WEB',
      'MOBILE_APP',
      'ATM',
      'BRANCH',
      'POS_TERMINAL',
      'RECURRING_SERVER'
    ]
    const statuses = ['PENDING', 'APPROVED', 'FLAGGED', 'BLOCKED', 'REVERSED']

    const transactions = []

    users.forEach((user) => {
      const numTransactions = faker.number.int({ min: 2, max: 3 })
      const userDevice = devices.find((d) => d.userId === user.id)

      for (let i = 0; i < numTransactions; i++) {
        transactions.push({
          userId: user.id,
          deviceFingerprintId: userDevice ? userDevice.id : null,
          transactionChannel: faker.helpers.arrayElement(channels),
          amount: faker.finance.amount({ min: 5, max: 5000, dec: 2 }),
          currency: 'USD',
          merchant: faker.company.name(),
          locationCity: faker.location.city(),
          locationCountry: faker.location.countryCode(),
          status: faker.helpers.arrayElement(statuses),
          riskScore: faker.number.int({ min: 0, max: 100 }),
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
    })

    await queryInterface.bulkInsert('transactions', transactions, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transactions', null, {})
  }
}
