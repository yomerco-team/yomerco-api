/* eslint-env jest */
const functions = require('./functions')

beforeEach(() => initDatabase())
afterEach(() => closeDatabase())

const initDatabase = () => console.log('Database up')
const closeDatabase = () => console.log('Database down')

// Verifica que el valor sea exaactamente igual al esperado
test('adds 2 + 2 to equal 4', () => {
  expect(functions.add(2, 2)).toBe(4)
})

// Niega el valor esperado
test('adds 2 + 2 to NOT equal 5', () => {
  expect(functions.add(2, 2)).not.toBe(5)
})

// Verifica si es un valor nulo
test('Should be null', () => {
  expect(functions.isNull()).toBeNull()
})

// Verifica si es un valor falso null, undefined, 0
test('Should be falsy', () => {
  expect(functions.checkValue(undefined)).toBeFalsy()
})

// Verifica si es un valor verdadero
test('Should be truthy', () => {
  expect(functions.checkValue(1)).toBeTruthy()
})

// Con este se pueden comparar arreglos y objetos
test('User should be Cristian Ippolito object', () => {
  expect(functions.createUser()).toEqual({
    firstName: 'Cristian',
    lastName: 'Ippolito'
  })
})

// Verifica que la respuesta sea menor que el esperado
test('Should be under 1600', () => {
  const load1 = 800
  const load2 = 700
  expect(load1 + load2).toBeLessThan(1600)
})

// Verifica que la respuesta sea mayor que el esperado
test('Should be up to 1600', () => {
  const load1 = 800
  const load2 = 900
  expect(load1 + load2).toBeGreaterThan(1600)
})

// Verifica expresiones regulares
test('There is no I in team', () => {
  expect('team').not.toMatch(/I/i)
})

// Valida que un arreglo de valores contenga el valor indicado
test('Admin should be in usernames', () => {
  const usernames = ['carlos', 'david', 'cristian', 'stiven', 'admin']
  expect(usernames).toContain('admin')
})

// Determina si algo se encuentra definido
test('createUser function exists', () => {
  expect(functions.createUser).toBeDefined()
})

/* Trabajando con comunicacion asincrona */

// Promesa
test('User fetched name should be Leanne Graham', () => {
  expect.assertions(1) // importante
  return functions.fetchUser() // importante el return
    .then(data => {
      expect(data.name).toEqual('Leanne Graham')
    })
})

// Async / Await
test('User fetched name should be Leanne Graham', async () => {
  expect.assertions(1) // importante
  const data = await functions.fetchUser()
  expect(data.name).toEqual('Leanne Graham')
})
