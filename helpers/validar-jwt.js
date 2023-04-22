const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario.model')

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
    res.status(403).send('No estas autenticado, token incorrecto')
  }
}


const validarADMIN_ROLE = async (req, res, next) => {
  try {
    const uid = req._id

    const usuarioDB = await Usuario.findById(uid)

    if (!usuarioDB) {
      return res.status(404).send({ ok: false, msg: 'Usuario no existe' })
    }

    if (usuarioDB.role !== 'ADMIN_ROLE') {
      return res.status(403).send({ ok: false, msg: 'No tiene privilegios para esto.' })
    }

    next()
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, msg: 'Hable con el administrador' })
  }
}

module.exports = {
  validarToken,
  validarADMIN_ROLE
}