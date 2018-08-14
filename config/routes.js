const express = require('express')
const auth = require('./auth')

module.exports = function (server) {

    /*
     * Rotas protegidas por Token JWT
     */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

		protectedApi.use(auth)

  //routas api
  const carCycleService = require('../api/carCycle/carCycleService')
  carCycleService.register(protectedApi, '/carCycles')

  //rota API Cliente
  const clientCycleService = require('../api/clientCycle/clientCycleService')
  clientCycleService.register(protectedApi, '/clientCycles')

	/*
     * Rotas abertas
     */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
		openApi.post('/validateToken', AuthService.validateToken)
}
