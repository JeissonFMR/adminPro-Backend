const { Router } = require('express')
const router = Router()

const { MedicosController } = require('../controllers/medico.controller')


const { validarToken } = require('../helpers/validar-jwt')
const { validatorCrearMedico } = require('../validators/medicos.validators')

module.exports.medicosAPI = (app) => {
  router
    .get('/', MedicosController.obtenerTodos)
    .post('/', validarToken, validatorCrearMedico, MedicosController.crearMedico)
    .put('/:id', MedicosController.actualizarMedico)
    .delete('/:id', MedicosController.eliminarMedico)
  app.use('/api/medicos', router)
}