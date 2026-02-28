'use strict'
const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [transactions] = await queryInterface.sequelize.query(
      `SELECT id FROM transactions WHERE status IN ('FLAGGED', 'BLOCKED');`
    )
    const [analysts] = await queryInterface.sequelize.query(
      `SELECT id, "firstName", "lastName" FROM users WHERE role = 'analyst';`
    )
    const [rules] = await queryInterface.sequelize.query(
      `SELECT id FROM fraud_rules;`
    )

    if (transactions.length === 0 || analysts.length === 0) return

    const actions = [
      'SYSTEM_FLAGGED',
      'SYSTEM_BLOCKED',
      'INVESTIGATION_OPENED',
      'NOTE_ADDED',
      'ESCALATED',
      'CONFIRMED_FRAUD',
      'FALSE_POSITIVE'
    ]

    const auditLogs = transactions.map((transaction) => {
      const analyst = faker.helpers.arrayElement(analysts)
      const rule = rules.length > 0 ? faker.helpers.arrayElement(rules) : null

      return {
        transactionId: transaction.id,
        analystId: analyst.id,
        fraudRuleId: rule ? rule.id : null,
        actionsTaken: faker.helpers.arrayElement(actions),
        actorName: `${analyst.firstName} ${analyst.lastName}`,
        notes: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    await queryInterface.bulkInsert('audit_logs', auditLogs, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('audit_logs', null, {})
  }
}
