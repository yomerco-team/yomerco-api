/* eslint-env jest */
require('dotenv').config()
process.env.NODE_ENV = 'test'
console.log('user ', process.env.DB_USER)
const faker = require('faker')

test('create a user in firebase', async () => {
  expect.assertions(1)
  const app = require('../../server/server')
  const { MyUser } = app.models
  const randomEmail = faker.internet.email().toLowerCase()

  // create the user for the test
  let userRow = null
  try {
    userRow = await MyUser.createUserInFirebase(randomEmail, '123456')
  } catch (error) {
    throw error
  }

  // delete the user for the test
  let response = null
  try {
    response = await MyUser.deleteUserInFirebase(userRow.email)
  } catch (error) {
    throw error
  }

  expect(response.count).toBe(1)
})
