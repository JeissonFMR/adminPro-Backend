const { Router } = require('express')
const router = Router()

const { AuthController } = require('../controllers/auth.controller')
const { validatorLogin } = require('../validators/auth.validators')
module.exports.authAPI = (app) => {
  router
    .post('/', validatorLogin, AuthController.login)
  app.use('/api/login', router)
}