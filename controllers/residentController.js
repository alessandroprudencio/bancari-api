const config = require('../db/knexfile')['production']
const knex = require('knex')(config)

import validator from 'validator'

const getResident = (req, res) => {
    knex.select('name', 'email', 'address', 'phone', 'number_address').from('residents').then(data => {
        res.send(data)
    })
    .catch(err=>res.send(err))
}

const createResident = async (req, res) => {
    const { name, email, address, phone, number_address } = req.body

    if (!name || !email || !address || !phone || !number_address) return res.status(400).send({ message: 'Por favor preencha todos os campos' })

    if (!validator.isEmail(email)) return res.status(400).send({ message: 'E-mail inválido' })
    

    knex('residents').insert(req.body)
        .then(() => {
            res.json({ message: "Morador cadastrado com sucesso!" })
        }).catch(error => {
            if (error.code == "ER_DUP_ENTRY") res.status(400).send({ message: 'Email já cadastrado!' })
        })
}

const updateResident = (req, res) => {

    knex('residents').update(req.body)
        .then(() => res.send({ message: "Atualizado com sucesso!" }))
        .catch(err => res.send({ message: err.sqlMessage }))
}

const deleteResident = (req, res) => {

    knex.select('id').from('residents').where({ id: req.params.id })
        .then(Resident => {
            if (!Resident.length) res.send({ message: "Usuário não encontrado" })

            let token = req.headers.authorization.split(" ")[1]
            if (jwt.decode(token).admin === 0) return res.status(401).send({ message: "Usuário não tem permissões para exclusão" })

            knex('Resident ').where({ id: req.params.id }).delete()
                .then(() => res.send({ message: "Excluido com sucesso!" }))
                .catch(err => res.send({ message: err.sqlMessage }))

        }).catch(err => res.status(400).send(err))


}

export { getResident, createResident, updateResident, deleteResident }
