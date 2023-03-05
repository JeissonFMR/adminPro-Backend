const { check } = require('express-validator');
const validateResults = require('./useValidators')

const validatorCrearUsuario = [
  check('nombre', 'El nombre es obligatorio.').exists().notEmpty(),
  check('password', 'La contraseña es obligatoria.').exists().notEmpty(),
  check('email', 'El correo electrónico es obligatorio.').isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
];

const validatorActualizarUsuario = [
  check('nombre', 'El nombre es obligatorio.').exists().notEmpty(),
  check('email', 'El correo electrónico es obligatorio.').isEmail(),
  check('role', 'El role es obligatorio.').notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

module.exports = { validatorCrearUsuario, validatorActualizarUsuario }