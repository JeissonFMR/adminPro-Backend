const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const dbConnection = async () => {

  try {
    const db = process.env.DB_CNN

    mongoose.connect(db);
    console.log('***  Base de datos corriendo ***');
  } catch (error) {
    console.log(error);
    throw new Error('Error al iniciar la base de datos ...')
  }
}

module.exports = {
  dbConnection
}