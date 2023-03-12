const { Router } = require('express')
const router = Router()
const { validarToken } = require('../helpers/validar-jwt');

const { HospitalesController } = require('../controllers/hospital.controller')
const { validatorCrearHospital } = require('../validators/hospitales.validators')

module.exports.HospitalesAPI = (app) => {
  router
    .get('/', HospitalesController.obtenerTodos)
    .post('/', validarToken, validatorCrearHospital, HospitalesController.crearHospital)
    .put('/:id', HospitalesController.actualizarHospital)
    .delete('/:id', HospitalesController.eliminarHospital)
  app.use('/api/hospitales', router)
}