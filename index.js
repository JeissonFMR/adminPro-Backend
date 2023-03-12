const express = require('express')
require('dotenv').config()
const cors = require('cors')
//LLAMADA DE base de datos
const { dbConnection } = require('./database/config')
// rutas
const { UsersAPI } = require('./routers/usuarios.routers')
const { authAPI } = require('./routers/auth.router')
const { HospitalesAPI } = require('./routers/hospital.router')
const { medicosAPI } = require('./routers/medicos.router')
const { busquedaAPI } = require('./routers/busqueda.router')
const { subirArchivoAPI } = require('./routers/subirArchivo.router')


const app = express()


app.use(cors())
app.use(express.json())

// USO DE RUTAS
UsersAPI(app)
authAPI(app)
HospitalesAPI(app)
medicosAPI(app)
busquedaAPI(app)
subirArchivoAPI(app)

const port = process.env.PORT || 3005
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);

})


//TODO: Base de datos
dbConnection()