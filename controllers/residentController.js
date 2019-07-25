const getResident = async (req, res) => {
    try {
        res.send(await knex.select('id', 'name', 'email', 'address', 'phone', 'number_address').from('residents'))
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const getByIdResident = async (req, res) => {
    try {
        res.send(await knex.select('id', 'name', 'email', 'address', 'phone', 'number_address').from('residents').where({ id: req.params.id }))
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const createResident = async (req, res) => {
    const { name, email, address, phone, number_address } = req.body

    if (!name || !email || !address || !phone || !number_address) return res.status(400).send({ message: 'Por favor preencha todos os campos' })

    if (email && !validator.isEmail(email)) return res.status(400).send({ message: 'E-mail inválido' })

    try {
        await (knex('residents').insert(req.body))
        res.send({ message: "Morador cadastrado com sucesso!" })
    } catch (err) {
        if (err.code == "ER_DUP_ENTRY") res.status(400).send({ message: 'Email já cadastrado!' })
        res.status(500).send({ message: err })
    }
}

const updateResident = async (req, res) => {

    try {
        await knex('residents').update(req.body).update('updated_at', knex.fn.now())
        res.send({ message: "Atualizado com sucesso!" })
    } catch (err) {
        res.status(500).send({ message: err })
    }

}

const deleteResident = async (req, res) => {

    try {
        let resident = await knex.select('id').from('residents').where({ id: req.params.id })
        if (!resident.length) return res.status(404).send({ message: "Usuário não encontrado" })

        let token = req.headers.authorization.split(" ")[1]
        if (jwt.decode(token).admin === 0) return res.status(401).send({ message: "Usuário não tem permissões para exclusão" })

        await knex('residents').where({ id: req.params.id }).delete()
        res.send({ message: "Excluido com sucesso!" })
    } catch (err) {
        res.status(500).send({ message: err })
    }



}

export { getResident, getByIdResident, createResident, updateResident, deleteResident }
