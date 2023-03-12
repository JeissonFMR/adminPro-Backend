const { Router } = require('express')
const router = Router()

const { MedicosController } = require('../controllers/medico.controller')


const { validarToken } = require('../helpers/validar-jwt')
const { validatorCrearMedico, validatorActualizarMedico } = require('../validators/medicos.validators')

module.exports.medicosAPI = (app) => {
  router
    .get('/', MedicosController.obtenerTodos)
    .post('/', validarToken, validatorCrearMedico, MedicosController.crearMedico)
    .put('/:id', validarToken, validatorActualizarMedico, MedicosController.actualizarMedico)
    .delete('/:id', MedicosController.eliminarMedico)
  app.use('/api/medicos', router)
}