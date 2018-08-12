'use strict'

const loopback = require('loopback')
const boot = require('loopback-boot')
const path = require('path')
const firebaseMiddleware = require('../server/middleware/firebase')

// Get the .env path
const envPath = path.resolve(__dirname, '../.env')
// start dotenv
require('dotenv').config({
  path: envPath
})

let app = module.exports = loopback()

app.middleware('routes:before', firebaseMiddleware())

app.start = () => {
  // start the web server
  return app.listen(() => {
    app.emit('started')
    var baseUrl = app.get('url').replace(/\/$/, '')
    console.log('Web server listening at: %s', baseUrl)
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath)
    }
  })
}

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, (err) => {
  if (err) throw err

  // start the server if `$ node server.js`
  if (require.main === module) { app.start() }
})
