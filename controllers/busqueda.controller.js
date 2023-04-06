
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

  },

  getDocumentosColeccion: async (req, res = response) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;

    const regex = new RegExp(busqueda, 'i');
    let data = [];

    switch (tabla) {
      case 'medicos':
        data = await Medico.find({ nombre: regex })
          .populate('usuario', 'nombre img')
          .populate('hospital', 'nombre img');
        break;
      case 'hospitales':
        data = await Hospital.find({ nombre: regex })
          .populate('usuario', 'nombre img')
        break;
      case 'usuarios':
        data = await Usuario.find({ nombre: regex })
        break;
    }

    res.status(200).send({ ok: true, resultados: data });
  }
}