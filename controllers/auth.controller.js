const express = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');


module.exports.AuthController = {

  login: async (req, res) => {

    try {
      const { email, password } = req.body;

      //Verificar email
      const usuarioDB = await Usuario.findOne({ email })
      if (!usuarioDB) {
        return res.status(404).json({
          msg: 'Email no encontrado'
        })
      }

      //Verificar contraseña
      const validPassword = bcryptjs.compareSync(password, usuarioDB.password)
      if (!validPassword) {
        return res.status(400).json({
          msj: 'Contraseña no válida'
        })
      }

      //TODO: GENERAR UN TOKEN
      const token = await generarJWT(usuarioDB)
      console.log(token);

      res.status(200).json({
        msj: {
          token
        }
      })


    } catch (error) {
      console.log(error);
      res.status(403).json({
        msj: 'Ocurrio un error en el login'
      })
    }
  }
}