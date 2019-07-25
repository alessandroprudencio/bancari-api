const getRealty = async (req, res) => {
    try {
        res.send(await knex('realtys').leftJoin('residents', 'realtys.owner_id', 'residents.id').select('residents.name', 'realtys.address', 'realtys.id', 'realtys.number_address'))
    } catch (err) {
        res.status(500).send({ message: err })
    }

}

const getByIdRealty = async (req, res) => {
    try {
        res.send(await knex('realtys').leftJoin('residents', 'realtys.owner_id', 'residents.id').select('residents.name', 'realtys.address', 'realtys.id', 'realtys.number_address')).where({ id: req.params.id }))
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const createRealty = async (req, res) => {
    const { owner_id, address, number_address } = req.body

    if (!address || !number_address) return res.status(400).send({ message: 'Por favor preencha todos os campos' })

    try {
        await knex('realtys').insert(req.body)
        res.send({ message: "Imóvel cadastrado com sucesso!" })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const updateRealty = async (req, res) => {

    try {
        await knex('realtys').update(req.body).update('updated_at', knex.fn.now())
        res.send({ message: "Atualizado com sucesso!" })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const deleteRealty = async (req, res) => {
    try {
        let resident = await knex.select('id').from('realtys').where({ id: req.params.id })
        if (!resident.length) return res.status(404).send({ message: "Usuário não encontrado" })
        let token = req.headers.authorization.split(" ")[1]
        if (jwt.decode(token).admin === 0) return res.status(401).send({ message: "Usuário não tem permissões para exclusão" })

        await knex('realtys').where({ id: req.params.id }).delete()
        res.send({ message: "Excluido com sucesso!" })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

export { getRealty, getByIdRealty, createRealty, updateRealty, deleteRealty }
