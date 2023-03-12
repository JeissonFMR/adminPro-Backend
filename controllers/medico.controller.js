const express = require('express')

const Medico = require('../models/medico.model')

module.exports.MedicosController = {
  obtenerTodos: async (req, res) => {

    const data = await Medico.find()
      .populate('usuario', 'nombre img')
      .populate('hospital', 'nombre img')
    res.status(200).json({
      medicos: data
    })
  },
  crearMedico: async (req, res) => {

    try {

      const { body } = req;
      const idUsuario = req._id
      // console.log(idUsuario)

      const data = await Medico.create({ usuario: idUsuario, ...body })

      return res.status(200).json({
        medico: data
      })

    } catch (error) {
      console.log(error);
      res.status(403).send('Error al crear medico, hable con el administrador')
    }
  },
  actualizarMedico: async (req, res) => {
    res.status(200).json({
      msg: 'actualiza medico'
    })
  },
  eliminarMedico: async (req, res) => {
    res.status(200).json({
      msg: 'eliminar medico'
    })
  }
}