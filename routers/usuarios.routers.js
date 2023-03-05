const { Router } = require('express')
const router = Router();

//Controladores
const { UsuariosController } = require('../controllers/usuarios.controller');
const { validarToken } = require('../helpers/validar-jwt');


//Validadores
const { validatorCrearUsuario, validatorActualizarUsuario } = require('../validators/usuarios.validators')

module.exports.UsersAPI = (app) => {
  router
    .get('/', validarToken, UsuariosController.obtenerTodos)
    .post('/', validatorCrearUsuario, UsuariosController.crearUsuario)
    .put('/:id', validarToken, validatorActualizarUsuario, UsuariosController.actualizarUsuario)
    .delete('/:id', validarToken, UsuariosController.borrarUsuario)
  app.use('/api/usuarios', router)
}
