const express = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');
const { response } = require('express');


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
          msg: 'Contraseña no válida'
        })
      }

      //TODO: GENERAR UN TOKEN
      const token = await generarJWT(usuarioDB)
      // console.log(token);

      res.status(200).json({
        msg: {
          token
        }
      })


    } catch (error) {
      console.log(error);
      res.status(403).json({
        msj: 'Ocurrio un error en el login'
      })
    }
  },
  renewLogin: async (req, res = response) => {

    const idUsuario = req._id

    const usuarioDB = await Usuario.findOne({ _id: idUsuario })
    const { email, role, img, nombre } = usuarioDB
    const usuario = new Usuario({
      _id: idUsuario,
      nombre,
      email,
      role,
      img
    })

    const token = await generarJWT(usuarioDB)


    // { usuario } = email
    // console.log(usuario);

    res.send({ msg: token, usuario })

  }
}