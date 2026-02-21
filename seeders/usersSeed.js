const { faker } = require('@faker-js/faker')

const user = {
  email: faker.internet.email(),
  password: 'password',
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  locationCity: faker.location.city(),
  locationCountry: faker.location.country(),
  riskScore: 12,
  role: 'analyst',
  isActive: true
}

console.log(user)
