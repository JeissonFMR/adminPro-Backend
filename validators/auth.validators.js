const { check } = require('express-validator')
const validateResults = require('./useValidators')

const validatorLogin = [
  check('email', 'El correo electrónico es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

module.exports = { validatorLogin }