const app = require('./server')

const ds = app.dataSources.db
const tables = [
  'MyUser',
  'MyRole',
  'AssinedRole',
  'State',
  'City',
  'Address',
  'Provider',
  'Category',
  'Product',
  'ProductImage',
  'Wharehouse',
  'Batch',
  'OrderStatus',
  'Order',
  'OrderDetail',
  'PaymentMethod',
  'PaymentStatus',
  'Payment',
  'Parameter',
  'Permission'
]

ds.autoupdate(tables, (err) => {
  const name = ds.adapter.name

  console.log(`working in ${name}`)
  console.log('error', err)
  if (err) throw err

  console.log(`${name} updated`)

  ds.disconnect()

  process.exit()
})
