const express = require('express')
const Hospital = require('../models/hospital.model')

module.exports.HospitalesController = {

  obtenerTodos: async (req, res) => {

    const data = await Hospital.find()
      .populate('usuario', 'nombre img')
    res.status(200).json({
      hospitales: data
    })
  },
  crearHospital: async (req, res) => {
    try {
      const { body } = req
      const idUsuario = req._id //TODO: aparece ya que en la validacion de JWT esta. 

      const data = await Hospital.create({ usuario: idUsuario, ...body })

      res.status(200).json({
        hospital: data
      })
    } catch (error) {
      console.log(error);
      res.status(403).send('Error al crear hospital, hable con el administrador')
    }


  },
  actualizarHospital: async (req, res) => {
    res.status(200).json({
      msg: 'actualiza hospital'
    })
  },
  eliminarHospital: async (req, res) => {
    res.status(200).json({
      msg: 'eliminar hospital'
    })
  }
}