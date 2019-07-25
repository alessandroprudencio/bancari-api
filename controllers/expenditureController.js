const getExpenditure = async (req, res) => {
    try {
        res.send(await knex('expenditures').select('id', 'value', 'updated_at').orderBy('updated_at', 'desc'))
    } catch (err) {
        res.status(500).send({ message: err })
    }

}

const getByIdExpenditure = async (req, res) => {
    try {
        res.send(await knex('expenditures').select('id', 'value', 'updated_at').orderBy('updated_at', 'desc').where({ id: req.params.id }))
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const createExpenditure = async (req, res) => {
    const { value, name } = req.body
    if (!value || !name) return res.status(400).send({ message: 'Por favor preencha todos os campos' })
    try {
        let expenditure = await knex('expenditures').insert(req.body).returning(['id', 'created_at'])
        res.send({ id: expenditure[0].id, user_id: expenditure[0].user_id, message: "Despesas cadastrada com sucesso!" })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const updateExpenditure = async (req, res) => {

    try {
        await knex('expenditures').where({ id: req.params.id }).update(req.body).update('updated_at', knex.fn.now())
        res.send({ message: "Atualizado com sucesso!" })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const deleteExpenditure = async (req, res) => {
    try {
        let resident = await knex.select('id').from('expenditures').where({ id: req.params.id })
        if (!resident.length) return res.status(404).send({ message: "Despesa não encontrada" })
        await knex('expenditures').where({ id: req.params.id }).delete()
        res.send({ message: "Excluido com sucesso!" })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

export { getExpenditure, getByIdExpenditure, createExpenditure, updateExpenditure, deleteExpenditure }
