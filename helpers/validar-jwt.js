const jwt = require('jsonwebtoken')


const validarToken = async (req, res, next) => {

  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      msg: 'Acceso denegado'
    })
  }
  try {
    const dataToken = await jwt.verify(token, process.env.JWT_SECRET)

    req._id = dataToken._id //TODO:CON ESTO LLAMO EN LOS VALIDADORES PARA SABER QUIEN ES EL USUARIO

    next()
  } catch (error) {
    res.status(403).send('No estas autenticado, token incorecto')
  }
}

module.exports = {
  validarToken
}