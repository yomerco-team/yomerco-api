const firebaseAdmin = require('firebase-admin')
const serviceAccountKey = require('./serviceAccountKey.json')

class Firebase {
  constructor () {
    this.admin = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccountKey),
      databaseURL: process.env.DATA_BASE_URL_FIRE_BASE
    })

    this.auth = firebaseAdmin.auth()
  }

  /**
  * Function to update the email for a user
  *
  * @param {String} uid identifier in firebase
  * @param {String} email email to update
  * @returns {Promise} Object with the information
  * @memberof Firebase
  */
  async updateEmail (uid, email) {
    // Actualizo el usuario
    try {
      this.auth.updateUser(uid, { email })
    } catch (error) {
      throw error
    }

    return {
      changed: true
    }
  }

  /**
  * Function to create a user in firebase
  *
  * @param {String} email email to the user
  * @param {String} password password to the user
  * @returns {Promise} Object that have the info about the user in firebase
  * @memberof Firebase
  */
  async createUser (email, password) {
    const objToUser = { email, password }

    let userRecord = null
    try {
      userRecord = await this.auth.createUser(objToUser)
      userRecord = userRecord.toJSON()
    } catch (error) {
      throw error
    }

    return userRecord
  }

  /**
   * Fucntion to delete a user in firebase
   *
   * @param {*} email email from user
   * @returns {Promise} a resolved promise
   * @memberof Firebase
   */
  async deleteUser (email) {
    // Get the user by email parameter
    let userRecord = null
    try {
      userRecord = await this.auth.getUserByEmail(email)
    } catch (error) {
      throw error
    }

    userRecord = userRecord.toJSON()

    try {
      await this.auth.deleteUser(userRecord.uid)
    } catch (error) {
      throw error
    }

    return Promise.resolve()
  }

  async verifyIdToken (token) {
    let userFirebase
    try {
      userFirebase = await this.auth.verifyIdToken(token)
    } catch (error) {
      throw error
    }
    return userFirebase
  }
}

const firebaInstance = new Firebase()

module.exports = firebaInstance
