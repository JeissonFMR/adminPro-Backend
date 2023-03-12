const { Router } = require('express')
const router = Router();


const { BusquedaTotal } = require('../controllers/busqueda.controller');
const { validarToken } = require('../helpers/validar-jwt');

module.exports.busquedaAPI = (app) => {
  router
    .get('/:busqueda', validarToken, BusquedaTotal.getToto)
  app.use('/api/todo', router)

}