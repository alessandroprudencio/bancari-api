const knex = require('knex')(require('../db/knexfile')['development'])

const getReservation = (req, res) => {

    knex('reservations').join('residents', 'reservations.resident_id','residents.id').select('residents.name','reservations.local', 'reservations.date')
        .then(data => {
            res.send(data)
        })
        .catch(err => res.send(err))
}

const getByIdReservation = (req, res) => {
    knex.select('*').from('reservations').where({ id: req.params.id })
        .then(data => {
            res.send(data)
        })
        .catch(err => res.send(err))
}

const createReservation = async (req, res) => {
    const { resident_id, local, date } = req.body

    if (!resident_id || !local || !date) return res.status(400).send({ message: 'Por favor preencha todos os campos' })

    knex('reservations').insert(req.body)
        .then(() => {
            res.json({ message: "Reserva efetuada com sucesso!" })
        }).catch(error => {
            if (error.code == "ER_DUP_ENTRY") res.status(400).send({ message: error })
        })
}

const updateReservation = (req, res) => {

    knex('reservations').update(req.body)
        .then(() => res.send({ message: "Atualizado com sucesso!" }))
        .catch(err => res.send({ message: err.sqlMessage }))
}

const deleteReservation = (req, res) => {

    knex.select('id').from('reservations').where({ id: req.params.id })
        .then(resident => {
            if (!resident.length) return res.status(404).send({ message: "Usuário não encontrado" })

            let token = req.headers.authorization.split(" ")[1]
            if (jwt.decode(token).admin === 0) return res.status(401).send({ message: "Usuário não tem permissões para exclusão" })

            knex('reservations').where({ id: req.params.id }).delete()
                .then(() => res.send({ message: "Excluido com sucesso!" }))
                .catch(err => res.status(400).send({ message: err.sqlMessage }))

        }).catch(err => res.status(400).send(err))


}

export { getReservation, getByIdReservation, createReservation, updateReservation, deleteReservation }
