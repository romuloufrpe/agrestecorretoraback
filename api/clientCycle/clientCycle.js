const restful = require('node-restful')
const mongoose = restful.mongoose

const clientSchema = new mongoose.Schema({
  name: { type: String},
  cpf: { type: Number}
})

const outSchema = mongoose.Schema({
  name: {type: String},
  cpf: {type: Number},
  status: {type: String, uppcase: true,
  enum: ['INTERESSADO']}
})
const clientCycleSchema = new mongoose.Schema({
  name:  {type: String},
  cpf: { type: Number},
  rg: {type: Number},
  city: { type: String},
  state: {type: String},
  cep: {type: String},
  celphone: {type: Number},
  status: {type: String, uppcase: true,
  enum: ['INTERESSADO']},
  clients:[clientSchema],
  outs:[outSchema]

})

module.exports = restful.model('ClientCycles', clientCycleSchema)
