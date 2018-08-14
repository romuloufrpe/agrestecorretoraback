const _ = require('lodash')
const User = require('./user')

const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,12})/


const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).json({ errors })
}

const login = (req, res, next) => {
    const email = req.body.email || ''
    const password = req.body.password || ''
    User.findOne({ email }, (err, user) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else if (user && (password == user.password)) {
            const { name, email } = user
            res.json({ name, email })
        }
        else {
            return res.status(400).send({ errors: ['Usuário/Senha inválidos'] })
        }
    })
}

const validateToken = (req, res, next) => {
    const token = req.body.token || ''
    jwt.verify(token, env.authSecret, function (err, decoded) {
        return res.status(200).send({ valid: !err })
    })
}

const signup = (req, res, next) => {
    const name = req.body.name || ''
    const email = req.body.email || ''
    const password = req.body.password || ''
    if (!email.match(emailRegex)) {
        return res.status(400).send({ errors: ['O e-mail informado está inválido'] })
    }
    if (!password.match(passwordRegex)) {
        return res.status(400).send({ errors: ["Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-12."] })
    }
    User.findOne({ email }, (err, user) => {
        if (err) { return sendErrorsFromDB(res, err) }
        else if (user) {
            return res.status(400).send({ errors: ['Usuário já cadastrado.'] })
        }
        else {
            const newUser = new User({ name, email, password })
            newUser.save(err => {
                if (err) { return sendErrorsFromDB(res, err) }
                else {
                    login(req, res, next)
                }
            })
        }
    })
}


module.exports = { login, validateToken,signup }
