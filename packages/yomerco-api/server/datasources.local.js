module.exports = {
  db: {
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    name: 'db',
    connector: 'postgresql',
    user: process.env.DB_USER
  }
}
