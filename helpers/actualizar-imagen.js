const fs = require('fs');

const Usuario = require('../models/usuario.model')
const Medico = require('../models/medico.model')
const Hospital = require('../models/hospital.model');
const path = require('path');

const borrarImagen = (path) => {
  //si existe la imagen
  if (fs.existsSync(path)) {
    //borra la imagen anterior
    fs.unlinkSync(path)
  }
}



const actualizarImagen = async (tipo, id, nombreArchivo) => {

  switch (tipo) {
    case 'medicos':
      const medico = await Medico.findById(id)
      if (!medico) {
        console.log('No es un médico por id');
        return false;
      }
      //aquí esta la imagen antigua
      const MEDIA_PATH = path.join(__dirname, `../uploads/medicos/${medico.img}`)
      borrarImagen(MEDIA_PATH)

      medico.img = nombreArchivo;
      await medico.save();
      return true
    case 'hospitales':
      const hospital = await Hospital.findById(id)
      if (!hospital) {
        console.log('No es un hospital por id');
        return false;
      }
      //aquí esta la imagen antigua
      const MEDIA_PATH_HOSPITAL = path.join(__dirname, `../uploads/hospitales/${hospital.img}`)
      borrarImagen(MEDIA_PATH_HOSPITAL)

      hospital.img = nombreArchivo;
      await hospital.save();
      return true
      break

    case 'usuarios':
      const usuario = await Usuario.findById(id)
      if (!usuario) {
        console.log('No es un hospital por id');
        return false;
      }
      //aquí esta la imagen antigua
      const MEDIA_PATH_USUARIO = path.join(__dirname, `../uploads/usuarios/${usuario.img}`)
      borrarImagen(MEDIA_PATH_USUARIO)

      usuario.img = nombreArchivo;
      await usuario.save();
      return true
      break
  }
}

module.exports = {
  actualizarImagen
}