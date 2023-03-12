const { check } = require('express-validator');
const validateResults = require('./useValidators')

const validatorCrearMedico = [
  check('nombre', 'El nombre del medico es obligatorio.').exists().notEmpty(),
  check('hospital', 'El hospital id debe ser valido').isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
];


module.exports = { validatorCrearMedico }