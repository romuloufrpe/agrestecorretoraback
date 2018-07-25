const express = require('express')

module.exports = function(server) {

  //API Routes
  const router = express.Router()
  server.use('/api', router)

  //routas api
  const carCycleService = require('../api/carCycle/carCycleService')
  carCycleService.register(router, '/carCycles')

  //rota API Cliente
  const clientCycleService = require('../api/clientCycle/clientCycleService')
  clientCycleService.register(router, '/clientCycles')
}
