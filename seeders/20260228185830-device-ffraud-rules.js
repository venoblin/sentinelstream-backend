'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [analysts] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE role = 'analyst';`
    )

    if (analysts.length === 0) {
      console.warn('No analysts found. Skipping FraudRule seeding.')
      return
    }

    const creatorId = analysts[0].id

    const rules = [
      {
        ruleName: 'High Value International',
        riskScoreImpact: 40,
        isActive: true,
        logicJson: JSON.stringify({
          amount: { gt: 5000 },
          locationCountry: { not: 'US' }
        }),
        creatorId: creatorId,
        version: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ruleName: 'Rapid Recurring Transactions',
        riskScoreImpact: 80,
        isActive: true,
        logicJson: JSON.stringify({ velocity: { count: 5, minutes: 10 } }),
        creatorId: creatorId,
        version: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await queryInterface.bulkInsert('fraud_rules', rules, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fraud_rules', null, {})
  }
}
