const restful = require('node-restful')
const mongoose = restful.mongoose

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true},
  cpf: { type: Number, required: true}
})

const outSchema = mongoose.Schema({
  name: {type: String, required: true},
  cpf: {type: Number, required: true},
  status: {type: String, required: false, uppcase: true,
  enum: ['INTERESSADO']}
})
const clientCycleSchema = new mongoose.Schema({
  name:  {type: String, required: true},
  cpf: { type: Number, required: true},
  rg: {type: Number, required: false},
  city: { type: String, required: false},
  state: {type: String, required: false},
  cep: {type: String, required: false},
  celphone: {type: Number, required: false}

})

module.exports = restful.model('ClientCycles', clientCycleSchema)
