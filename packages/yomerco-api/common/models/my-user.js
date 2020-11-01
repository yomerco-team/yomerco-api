const firerebaseInstance = require('../../server/services/firebase')

module.exports = function (MyUser) {
  const myUserParameter = MyUser

  /**
  * Remote method to create a user in firebase
  *
  * @param {String} email
  * @param {String} password
  * @returns {Promise} Object with the user information from firebase
  */
  myUserParameter.createUserInFirebase = async (email, password) => {
    // call the process to create a user in firebase
    let userRow = null
    try {
      userRow = await firerebaseInstance.createUser(email, password)
    } catch (error) {
      throw error
    }

    return userRow
  }

  myUserParameter.remoteMethod('createUserInFirebase', {
    accepts: [
      {
        arg: 'email',
        type: 'string',
        required: true,
        description: 'email to create a user'
      },
      {
        arg: 'password',
        type: 'string',
        required: true,
        description: 'password to create a user'
      }
    ],
    returns: {
      arg: 'user',
      type: 'object',
      root: true
    },
    http: {
      path: '/create-user-in-firebase',
      verb: 'post',
      status: 200,
      errorStatus: 400
    },
    description: 'Create a user in firebase'
  })

  /**
   * Remote method to delete a user in firebase
   *
   * @param {String} email
   * @returns {Object} with the count information about the deleted user
   */
  myUserParameter.deleteUserInFirebase = async (email) => {
    // Call the process to delete a user in firebase
    try {
      await firerebaseInstance.deleteUser(email)
    } catch (error) {
      throw error
    }

    let user = await myUserParameter.findById(1)
    console.log(user)
    return { count: 1 }
  }

  myUserParameter.remoteMethod('deleteUserInFirebase', {
    accepts: {
      arg: 'email',
      type: 'string',
      required: true,
      description: 'email to create a user'
    },
    returns: {
      arg: 'user',
      type: 'object',
      root: true
    },
    http: {
      path: '/delete-user-in-firebase',
      verb: 'delete',
      status: 200,
      errorStatus: 400
    },
    description: 'Delete a user in firebase'
  })
}
