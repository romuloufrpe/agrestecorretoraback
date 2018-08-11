const restful = require('node-restful')
const mongoose = restful.mongoose

const carSchema = new mongoose.Schema({
  name: {type: String},
  model:{type: String},
  value: {type:Number}
})

const outSchema = mongoose.Schema({
  name: {type: String},
  model: {type: String},
  value: {type: Number}
})

const carCycleSchema = new mongoose.Schema({
  //name
  brand: { type: String},
  //modelo
  model: {type: String},
  //ano
  year: {type: Number, min: 1970, max: 2100},
  //cor
  color: {type: String},
  //placa
  board: {type: String},
  //Renavan
  renavan: {type: Number, min: 0},
  //valor
  value: {type: Number, min: 0},
  //valor de venda
  valuev: {type: Number, min: 0},
  status: {type: String, uppcase: true,
  enum: ['VENDIDO', 'DISPONIVEL', 'OFICINA']},
  cars: [carSchema],
  outs: [outSchema]
})

module.exports = restful.model('CarCycles', carCycleSchema)
