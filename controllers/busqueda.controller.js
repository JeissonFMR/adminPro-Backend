
const { response } = require('express');
const Usuario = require('../models/usuario.model')
const Hospital = require('../models/hospital.model')
const Medico = require('../models/medico.model')

module.exports.BusquedaTotal = {
  getToto: async (req, res = response) => {

    const busqueda = req.params.busqueda
    const regex = new RegExp(busqueda, 'i');
    console.log(regex)

    const usuarios = await Usuario.find({ nombre: regex })
    const hospitales = await Hospital.find({ nombre: regex })
    const medicos = await Medico.find({ nombre: regex })

    return res.status(200).json({
      usuarios,
      hospitales,
      medicos
    })

  }
}