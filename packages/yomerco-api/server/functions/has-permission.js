/**
 * Funcion que determina si quien peticiona, puede realizar o no la peticion
 *
 * @param {Number} [typeId=null] id del tipo de usuario
 * @param {String} [modelName=null] nombre del modelo
 * @param {String} [httpMethod=null] metodo http
 * @returns {Promise} booleano que indica si esta permitido o no el acceso al modelo
 */
const hasPermission = async (roleIds = [], modelName = null, httpMethod = null) => {
  // Get the app
  const app = require('../server')

  // Valido los parametros
  if (roleIds.length < 1 || modelName === null || httpMethod === null) {
    throw new Error('Some parameter is empty')
  }

  const { Permission } = app.models
  let permissionInstance = null
  try {
    permissionInstance = await Permission.findOne({
      where: {
        roleId: {
          inq: roleIds
        },
        modelName,
        httpMethod
      }
    })
  } catch (error) {
    throw error
  }
  if (permissionInstance === null) { throw new Error('El permiso no existe.') }

  return permissionInstance.allow
}

module.exports = hasPermission
