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
    try {

      const { params: { id } } = req
      const usuarioid = req._id // viene de validacion jwt


      const medicoDB = await Medico.findById(id)

      if (!medicoDB) {
        return res.status(404).json({
          msg: 'Médico no encontrado'
        })
      }

      const cambiosMedico = {
        ...req.body,
        usuario: usuarioid
      }

      const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true })


      return res.status(200).send({ medico: medicoActualizado })
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: 'Error al actualizar hospital, hable con el administrador' })
    }
  },
  eliminarMedico: async (req, res) => {
    try {

      const { params: { id } } = req


      const medicoDB = await Medico.findById(id)

      if (!medicoDB) {
        return res.status(404).json({
          msg: 'Médico no encontrado'
        })
      }


      await Medico.findByIdAndDelete(id)


      return res.status(200).send({ msg: 'Médico eliminado.' })
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: 'Error al actualizar hospital, hable con el administrador' })
    }
  }
}