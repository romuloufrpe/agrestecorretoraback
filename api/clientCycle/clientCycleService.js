const _ = require('lodash')
const ClientCycle = require('./clientCycle')

ClientCycle.methods(['get', 'post', 'put', 'delete'])
ClientCycle.updateOptions({new: true, runValidators: true})

ClientCycle.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

function sendErrorsOrNext(err, req, res, next) {
  const bundle = res.locals.bundle
  if(bundle.errors) {
    var errors = parseErrors(bundle.errors)
    res.status(500).json({errors})
  } else {
    next()
  }
}

function parseErrors(nodeRestfulErrors) {
  const errors = []
  _.forIn(nodeRestfulErrors, error => errors.push(error.message))
  return errors
}

ClientCycle.route('count', function(req, res, next) {
  ClientCycle.count(function(error, value) {
    if(error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json({value})
    }
  })
})

module.exports = ClientCycle
