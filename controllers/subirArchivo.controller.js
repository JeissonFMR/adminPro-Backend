const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen')


const fs = require('fs');
const path = require('path');
const { response } = require('express');
const MEDIA_PATH = path.join(__dirname, '../uploads/')
module.exports.uploadArchivo = {

  subirArchivo: async (req, res) => {

    //Parametros que paso en la URL
    const tipo = req.params.tipo
    const id = req.params.id

    const tiposValidos = ['hospitales', 'medicos', 'usuarios']

    if (!tiposValidos.includes(tipo)) {
      return res.status(400).send({ msg: 'Tipo no valido' })
    }

    //Validar que exista un archvo, imagen u algún otro
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send({ msg: 'No hay ningún archivo' });
    }


    //procesar file
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.'); //esta cada parametro en un array
    const extension = nombreCortado[nombreCortado.length - 1];
    const validarExtension = ['png', 'jpg', 'jpeg', 'gif']

    //Validar extension
    if (!validarExtension.includes(extension)) {
      return res.status(400).send({ msg: 'No es una extensión permitida' });
    }
    //Nombre archivo
    const nombreArchivo = `${uuidv4()}.${extension}`;

    //Subir archivo y mover la imagen
    const path = `${MEDIA_PATH}/${tipo}/${nombreArchivo}`

    file.mv(path, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: 'Error al mover la imagen' });
      }

      //TODO: actualizar la base de datos
      actualizarImagen(tipo, id, nombreArchivo);

      return res.status(200).send({ msg: 'Archivo subido', nombre: nombreArchivo })
    });
  },
  mostrarImagen: async (req, res = response) => {
    const tipo = req.params.tipo
    const foto = req.params.foto

    const pathImgen = path.join(__dirname, `../uploads/${tipo}/${foto}`)

    //imagen por defecto
    if (fs.existsSync(pathImgen)) {
      res.sendFile(pathImgen)
    } else {
      const pathNoImgen = path.join(__dirname, `../uploads/no-imagen.png`)
      res.sendFile(pathNoImgen)
    }

  }
}