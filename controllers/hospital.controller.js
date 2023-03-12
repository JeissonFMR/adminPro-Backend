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

    try {

      const { params: { id } } = req
      const usuarioid = req._id // viene de validacion jwt


      const hospitalDB = await Hospital.findById(id)

      if (!hospitalDB) {
        return res.status(404).json({
          msg: 'Hospital no encontrado'
        })
      }

      const cambiosHospitales = {
        ...req.body,
        usuario: usuarioid
      }

      const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospitales, { new: true })


      return res.status(200).send({ hospital: hospitalActualizado })
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: 'Error al actualizar hospital, hable con el administrador' })
    }

  },
  eliminarHospital: async (req, res) => {

    try {

      const { params: { id } } = req


      const hospitalDB = await Hospital.findById(id)

      if (!hospitalDB) {
        return res.status(404).json({
          msg: 'Hospital no encontrado'
        })
      }

      await Hospital.findByIdAndDelete(id)

      return res.status(200).send({ msg: 'Hospital eliminado' })
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: 'Error al actualizar hospital, hable con el administrador' })
    }

  }
}