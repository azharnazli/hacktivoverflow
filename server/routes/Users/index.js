const routes = require('express').Router()
const { UserController } = require('../../controllers/')

routes.post('/', UserController.createUser)
routes.post('/login', UserController.loginUser)
routes.post('/verify', UserController.verifyToken)

module.exports = routes