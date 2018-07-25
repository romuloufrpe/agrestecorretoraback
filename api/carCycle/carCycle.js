const restful = require('node-restful')
const mongoose = restful.mongoose

const carSchema = new mongoose.Schema({
  name: {type: String, required: true},
  model:{type: String, required: true},
  value: {type:Number, requeride: true}
})

const outSchema = mongoose.Schema({
  name: {type: String, required: true},
  model: {type: String, required: true},
  value: {type: Number, min: 0, required: [true, 'Informe o valor']},
  status: {type: String, required: false, uppcase: true,
  enum: ['VENDIDO', 'DISPONIVEL', 'OFICINA']}
})

const carCycleSchema = new mongoose.Schema({
  //name
  brand: { type: String, required: true},
  //modelo
  model: {type: String, required: true},
  //ano
  year: {type: Number, min: 1970, max: 2100, required: true},
  //cor
  color: {type: String, required: false},
  //placa
  board: {type: String, required: true},
  //Renavan
  renavan: {type: Number, min: 0, required: true},
  //valor
  value: {type: Number, min: 0, required: true},
  //valor de venda
  valuev: {type: Number, min: 0, required: true},
  cars: [carSchema],
  outs: [outSchema]
})

module.exports = restful.model('CarCycles', carCycleSchema)
