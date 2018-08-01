const firebaseAdmin = require('firebase-admin')
const serviceAccountKey = require('./serviceAccountKey')

class FirebaBase {
  constructor () {
    this.admin = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccountKey),
      databaseURL: process.env.DATA_BASE_URL_FIRE_BASE
    })
  }

  auth = firebaseAdmin.auth()

  /**
  * funcion encargada de actualizar el email del usuario
  *
  * @param {String} uid
  * @param String} email
  * @returns {Promise} objeto con la info
  */
  updateEmail = async (uid, email) => {
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
  * Funcion encargada de crear un usuario en firebase
  *
  * @param {String} email email del usuario
  * @param {String} password clave del usuario
  * @returns {Promise} objeto con la info del usuario creado en firebase
  */
 createUser = async (email, password) => {
   const objToUser = { email, password }

   let userRecord = null
   try {
     userRecord = await this.auth.createUser(objToUser)
   } catch (error) {
     throw error
   }

   return userRecord
 }
}

const firebaInstance = new FirebaBase()

module.exports = { firebaInstance }
