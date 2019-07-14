import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'

const config = require('../db/knexfile')[process.env.NODE_ENV]
const knex = require('knex')(config)


const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) res.status(400).send({ message: 'Passe os dados e não me fo!@#!' })

    let user = await knex('users').select('email', 'password', 'admin').whereRaw('email = ?', email)
    if (!user.length) res.status(404).send({ message: 'E-mail não encontrado' })

    if (bcrypt.compareSync(req.body.password, user[0].password)) res.status(200).send({ email: email, token: jwt.sign({ user: req.body, admin: user[0].admin }, process.env.SECRET_TOKEN, { expiresIn: '1h' }) })
    else res.status(401).send({ message: 'Dados invalidos' })

}


export default login

