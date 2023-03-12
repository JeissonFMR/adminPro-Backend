const { check } = require('express-validator');
const validateResults = require('./useValidators')

const validatorCrearHospital = [
  check('nombre', 'El nombre es obligatorio.').exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
];

const validatorActualizarHospital = [
  check('nombre', 'El nombre es obligatorio.').exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
];

module.exports = { validatorCrearHospital, validatorActualizarHospital }