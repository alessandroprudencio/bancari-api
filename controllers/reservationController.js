const getReservation = async (req, res) => {
    try {
        res.send(await knex('reservations').join('residents', 'reservations.resident_id', 'residents.id').select('residents.name', 'reservations.place', 'reservations.date'))
    } catch (err) {
        res.status(500).send({ message: err })
    }

}

const getByIdReservation = async (req, res) => {
    try {
        res.send(await knex('reservations').join('residents', 'reservations.resident_id', 'residents.id').select('residents.name', 'reservations.place', 'reservations.date')).where({ id: req.params.id }))
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const createReservation = async (req, res) => {
    const { resident_id, place, date } = req.body

    if (!resident_id || !place || !date) return res.status(400).send({ message: 'Por favor preencha todos os campos' })

    try {
        await knex('reservations').insert(req.body)
        res.send({ message: "Reserva efetuada com sucesso!" })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const updateReservation = async (req, res) => {

    try {
        await knex('reservations').update(req.body).update('updated_at', knex.fn.now())
        res.send({ message: "Atualizado com sucesso!" })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const deleteReservation = async (req, res) => {
    try {
        let resident = await knex.select('id').from('reservations').where({ id: req.params.id })
        if (!resident.length) return res.status(404).send({ message: "Usuário não encontrado" })
        let token = req.headers.authorization.split(" ")[1]
        if (jwt.decode(token).admin === 0) return res.status(401).send({ message: "Usuário não tem permissões para exclusão" })

        await knex('reservations').where({ id: req.params.id }).delete()
        res.send({ message: "Excluido com sucesso!" })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

export { getReservation, getByIdReservation, createReservation, updateReservation, deleteReservation }
