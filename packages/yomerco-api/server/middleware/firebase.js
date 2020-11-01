const getParameterValue = require('../functions/get-parameter-value')
const firebaseInstance = require('../services/firebase')
const hasPermission = require('../functions/has-permission')

module.exports = () => async (req, res, next) => {
  let authorization = req.headers.authorization || req.headers.Authorization
  if (!authorization && req.query.token) { authorization = `Bearer ${req.query.token}` }

  const method = req.method

  const modelPluralName = req.url.split('/')[2] ? req.url.split('/')[2].split('?')[0] : req.url.split('/')[1]

  // Si no tiene autorización valido los permisos del invitado
  if (!authorization) {
    // Obtengo el codigo para tipo invitado
    const nameP = 'ROLE_ANONIMO_CODE'
    let anonymousCode
    try {
      anonymousCode = await getParameterValue(nameP)
    } catch (error) {
      console.log('error', error)
      return res.status(401).send('unauthorized')
    }

    // Obtengo el tipo de usuario
    let roleInstance
    try {
      roleInstance = await req.app.models.MyRole.findOne({ where: { code: anonymousCode } })
    } catch (error) {
      console.log('error', error)
      return res.status(401).send('unauthorized')
    }

    // Valido
    if (!roleInstance) {
      return res.status(401).send('unauthorized')
    }

    // Valido los permisos
    let allow = null
    try {
      allow = await hasPermission([ roleInstance.id ], modelPluralName, method)
    } catch (error) {
      console.log('error', error)
      return res.status(401).send('unauthorized')
    }

    // Valido
    if (allow === null) { return res.status(401).send('unauthorized') }

    // Verifico que si este permitido
    if (!allow) { return res.status(401).send('unauthorized') } else { return Promise.resolve(next()) }
  }

  // Obtengo el token
  const token = authorization.split(' ')[1]

  // Valido el si hay token
  if (!token) {
    return res.status(401).send('The token is empty')
  }

  // Obtengo el developer token :D
  let nameP = 'DEVELOP_TOKEN'
  let devToken
  try {
    devToken = await getParameterValue(nameP)
  } catch (error) {
    return next(error.message)
  }

  // If the token is the develop token
  if (token === devToken) {
    return Promise.resolve(next())
  }

  let userFirebase = null
  try {
    userFirebase = await firebaseInstance.verifyIdToken(token)
  } catch (error) {
    console.log('error', error)
    return res.status(401).send('The token is not valid')
  }

  // Obtengo el usuario
  let userInstance
  try {
    userInstance = await req.app.models.MyUser.findOne({
      where: {
        uidAuth: userFirebase.uid
      }
    })
  } catch (error) {
    return res.status(401).send(error)
  }

  // Valido
  if (!userInstance) {
    return res.status(401).send('The token is not valid, user does not exists.')
  }

  // Get the roles from a user
  let roleIds
  try {
    roleIds = await userInstance.myRoles.find()
    roleIds = roleIds ? roleIds.map(item => item.id) : undefined
  } catch (error) {
    throw error
  }

  // Validate the permissions
  let allow
  try {
    allow = await hasPermission(roleIds, modelPluralName, method)
  } catch (error) {
    return res.status(401).send('permission doesnt exists')
  }

  // Valido
  if (!allow) {
    return res.status(401).send('unauthorized')
  }

  // Verifico que si este permitido
  if (!allow) {
    return res.status(401).send('unauthorized')
  } else {
    req.user = userInstance
    return Promise.resolve(next())
  }
}
