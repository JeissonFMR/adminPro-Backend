const { Router } = require('express')
const router = Router();

const fileUpload = require('express-fileupload');

const { uploadArchivo } = require('../controllers/subirArchivo.controller');
const { validarToken } = require('../helpers/validar-jwt');

module.exports.subirArchivoAPI = (app) => {

  app.use(fileUpload());


  router
    .put('/:tipo/:id', validarToken, uploadArchivo.subirArchivo)
    .get('/:tipo/:foto', uploadArchivo.mostrarImagen)
  app.use('/api/upload', router)

}