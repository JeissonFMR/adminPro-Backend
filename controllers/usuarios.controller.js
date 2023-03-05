const Usuario = require('../models/usuario.model')
const bcryptjs = require('bcryptjs')
const { findById, findByIdAndUpdate } = require('../models/usuario.model')
const { generarJWT } = require('../helpers/jwt')

module.exports.UsuariosController = {

  /**
   * LISTAR USUARIOS
   * @param {*} req 
   * @param {nombre, role, email, google} res 
   */
  obtenerTodos: async (req, res) => {

    const usuario = await Usuario.find({}, 'nombre role email google')
    res.status(200).json({
      usuario,
      idUser: req._id
    })

  },

  /**
   * CREAR USUARIO
   * @param {body} req 
   * @param {*} res 
   * @returns 
   */
  crearUsuario: async (req, res) => {

    try {
      const { body } = req;
      const existeEmail = await Usuario.findOne({ email: body.email })
      if (existeEmail) {
        return res.status(400).send('El correo ya está en uso')
      }

      const contrasenaPlana = body.password
      const salt = bcryptjs.genSaltSync();
      const passwordEncrypt = await bcryptjs.hash(contrasenaPlana, salt)

      const usuario = await Usuario.create({ usuario: body.usuario, email: body.email, password: passwordEncrypt })
      usuario.set('password', undefined, { strict: false }) //no envio la contraseña como data ...


      const token = await generarJWT(usuario)

      res.status(200).json({
        msj: { usuario },
        token
      })
    } catch (error) {
      console.log(error);
      res.status(403).send('Error al crear usuario')
    }

  },

  actualizarUsuario: async (req, res) => {
    try {
      //TODO: Validar token y verificar si el usuario es correcto
      const { params: { id } } = req;

      const usuarioDB = await Usuario.findById(id);
      if (!usuarioDB) {
        return res.status(404).send('El usuario con ese Id no existe')
      }

      const { password, google, email, ...campos } = req.body; //No voy a utilizar password y google, los extraigo

      console.log(campos)
      if (usuarioDB.email !== email) {

        const existeEmail = await Usuario.findOne({ email: email })

        if (existeEmail) {
          return res.status(403).send('Este correo ya existe!')
        }
      }
      campos.email = email;

      const usuarioActualizado = await Usuario.findOne({ _id: id })
      Object.assign(usuarioActualizado, campos)
      await usuarioActualizado.save()

      res.status(200).send(campos)

    } catch (error) {
      console.log(error);
      res.status(403).send('Error al actualizar usuario')
    }
  },
  borrarUsuario: async (req, res) => {
    try {

      const { params: { id } } = req;
      const usuarioDB = await Usuario.findById(id);

      if (!usuarioDB) {
        return res.status(404).send('El usuario con ese Id no existe')
      }

      await Usuario.findByIdAndDelete(id);
      res.json({
        msj: 'Usuario eliminado'
      })

    } catch (error) {
      res.status(403).send('Error al borrar usuario')
    }

  }

}