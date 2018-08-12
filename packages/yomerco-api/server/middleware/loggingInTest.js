const path = require('path')
// Get the .env path
const envPath = path.resolve(__dirname, '../../.env')
// start dotenv
require('dotenv').config({
  path: envPath
})
const firebase = require('firebase')

var config = {
  apiKey: process.env.FIRE_BASE_API_KEY,
  authDomain: process.env.FIRE_BASE_AUTH_DOMAIN,
  databaseURL: process.env.FIRE_BASE_DATA_BASE_URL,
  projectId: process.env.FIRE_BASE_PROJECT_ID,
  storageBucket: process.env.FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIRE_BASE_MESSAGING_SENDER_ID
}
firebase.initializeApp(config)

firebase.auth().signInWithEmailAndPassword('cristiandavidippolito@gmail.com', '123456')
  .then(res => console.log('accesToken', res.user.toJSON().stsTokenManager.accessToken))
  .catch(err => console.log('error', err))
