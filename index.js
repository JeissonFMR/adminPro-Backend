const express = require('express')



//LLAMADA DE base de datos
const { dbConnection } = require('./database/config')
//CORS
let cors = require('cors')



require('dotenv').config()

const app = express()
app.use(cors())



//TODO: Base de datos
dbConnection()

const port = process.env.PORT || 3005
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);

})