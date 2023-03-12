const { Router } = require('express')
const router = Router()

const { AuthController } = require('../controllers/auth.controller')
const { validatorLogin } = require('../validators/auth.validators')
const { validarToken } = require('../helpers/validar-jwt.js')
module.exports.authAPI = (app) => {
  router
    .post('/', validatorLogin, AuthController.login)
    .get('/renew', validarToken, AuthController.renewLogin)
  app.use('/api/login', router)
}