/**
 * Function to get the value of a parameter store in the data base
 *
 * @param {String} name nombre del parametro
 * @returns {String} valor del parametro
 */
const getParameterValue = async name => {
  const app = require('../server')

  const { Parameter } = app.models
  let parameterInstance = null
  try {
    parameterInstance = await Parameter.findOne({ where: { name } })
  } catch (error) {
    throw error
  }
  // Valido
  if (parameterInstance === null) {
    throw new Error(`El parametro con el nombre ${name}, no existe.`)
  }

  // Valido otra vez
  if (parameterInstance.value === null) {
    throw new Error(`El parametro con el nombre ${name}, no tiene un valor.`)
  }

  return parameterInstance.value
}

module.exports = getParameterValue
