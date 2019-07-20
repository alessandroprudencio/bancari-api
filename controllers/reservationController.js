const getReservation = async (req, res) => {
    try {
        res.send(await knex('reservations').join('residents', 'reservations.resident_id', 'residents.id').select('residents.name', 'reservations.place', 'reservations.date'))
    } catch (error) {
        sendStatus(500).send({ message: error })
    }

}

const getByIdReservation = async (req, res) => {
    try {
        res.send(await knex.select('*').from('reservations').where({ id: req.params.id }))
    } catch (error) {
        sendStatus(500).send({ message: error })
    }
}

const createReservation = async (req, res) => {
    const { resident_id, place, date } = req.body

    if (!resident_id || !place || !date) return sendStatus(400).send({ message: 'Por favor preencha todos os campos' })

    try {
        await knex('reservations').insert(req.body)
        res.json({ message: "Reserva efetuada com sucesso!" })
    } catch (error) {
        sendStatus(500).send({ message: error })
    }
}

const updateReservation = async (req, res) => {

    try {
        await knex('reservations').update(req.body)
        res.send({ message: "Atualizado com sucesso!" })
    } catch (error) {
        sendStatus(500).send({ message: error })
    }
}

const deleteReservation = async (req, res) => {
    try {
        let resident = await knex.select('id').from('reservations').where({ id: req.params.id })
        if (!resident.length) return sendStatus(404).send({ message: "Usuário não encontrado" })
        let token = req.headers.authorization.split(" ")[1]
        if (jwt.decode(token).admin === 0) return sendStatus(401).send({ message: "Usuário não tem permissões para exclusão" })

        await knex('reservations').where({ id: req.params.id }).delete()
        res.send({ message: "Excluido com sucesso!" })
    } catch (error) {
        sendStatus(500).send({ message: error })
    }
}

export { getReservation, getByIdReservation, createReservation, updateReservation, deleteReservation }
