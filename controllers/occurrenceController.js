const getOccurrence = async (req, res) => {
    try {
        res.send(await knex('occurrences').join('users', 'occurrences.user_id', 'users.id').select('occurrences.id', 'occurrences.updated_at', 'users.name as user_name', 'occurrences.message').orderBy('occurrences.updated_at', 'desc'))
    } catch (err) {
        res.status(500).send({ message: err })
    }

}

const getByIdOccurrence = async (req, res) => {
    try {
        res.send(await knex('occurrences').join('users', 'occurrences.user_id', 'users.id').select('users.name', 'occurrences.message').where({ id: req.params.id }))
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const createOccurrence = async (req, res) => {
    const { user_id, message } = req.body
    if (!user_id || !message) return res.status(400).send({ message: 'Por favor preencha todos os campos' })
    try {
        let occurrence = await knex('occurrences').insert(req.body).returning(['id', 'created_at', 'user_id'])
        await socket.emit('create_occurrence', { id: occurrence[0].id, message: message, created_at: occurrence[0].created_at, user_id: occurrence[0].user_id })
        res.send({ id: occurrence[0].id, user_id: occurrence[0].user_id, message: "Ocorrencia cadastrada com sucesso!" })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const updateOccurrence = async (req, res) => {

    try {
        await knex('occurrences').where({ id: req.params.id }).update(req.body).update('updated_at', knex.fn.now())
        res.send({ message: "Atualizado com sucesso!" })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const deleteOccurrence = async (req, res) => {
    try {
        let resident = await knex.select('id').from('occurrences').where({ id: req.params.id })
        if (!resident.length) return res.status(404).send({ message: "Usuário não encontrado" })
        let token = req.headers.authorization.split(" ")[1]
        if (jwt.decode(token).admin === 0) return res.status(401).send({ message: "Usuário não tem permissões para exclusão" })

        await knex('occurrences').where({ id: req.params.id }).delete()
        res.send({ message: "Excluido com sucesso!" })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

export { getOccurrence, getByIdOccurrence, createOccurrence, updateOccurrence, deleteOccurrence }
