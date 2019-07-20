const knex = require('knex')(require('../db/knexfile')[process.env.NODE_ENV || 'development'])

const getRealty = async (req, res) => {
    try {
        res.send(await knex('realtys').leftJoin('residents', 'realtys.owner_id', 'residents.id').select('residents.name', 'realtys.address', 'realtys.number_address'))
    } catch (error) {
        res.status(500).send({ message: error })
    }

}

const getByIdRealty = async (req, res) => {
    try {
        res.send(await knex.select('*').from('realtys').where({ id: req.params.id }))
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

const createRealty = async (req, res) => {
    const { owner_id, address, number_address } = req.body

    if (!address || !number_address) return res.status(400).send({ message: 'Por favor preencha todos os campos' })

    try {
        await knex('realtys').insert(req.body)
        res.json({ message: "Imóvel cadastrado com sucesso!" })
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

const updateRealty = async (req, res) => {

    try {
        await knex('realtys').update(req.body)
        res.send({ message: "Atualizado com sucesso!" })
    } catch (error) {
        res.status(500).send({ message: error })
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
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

export { getRealty, getByIdRealty, createRealty, updateRealty, deleteRealty }
