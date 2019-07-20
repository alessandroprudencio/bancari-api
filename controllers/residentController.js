const getResident = async (req, res) => {
    try {
        res.send(await knex.select('id', 'name', 'email', 'address', 'phone', 'number_address').from('residents'))
    } catch (error) {
        sendStatus(500).send({ message: error })
    }
}

const getByIdResident = async (req, res) => {
    try {
        res.send(await knex.select('id', 'name', 'email', 'address', 'phone', 'number_address').from('residents').where({ id: req.params.id }))
    } catch (error) {
        sendStatus(500).send({ message: error })
    }
}

const createResident = async (req, res) => {
    const { name, email, address, phone, number_address } = req.body

    if (!name || !email || !address || !phone || !number_address) return sendStatus(400).send({ message: 'Por favor preencha todos os campos' })

    if (email && !validator.isEmail(email)) return sendStatus(400).send({ message: 'E-mail inválido' })

    try {
        await (knex('residents').insert(req.body))
        res.json({ message: "Morador cadastrado com sucesso!" })
    } catch (error) {
        if (error.code == "ER_DUP_ENTRY") sendStatus(400).send({ message: 'Email já cadastrado!' })
        sendStatus(500).send({ message: error })
    }
}

const updateResident = async (req, res) => {

    try {
        await knex('residents').update(req.body)
        res.send({ message: "Atualizado com sucesso!" })
    } catch (error) {
        sendStatus(500).send({ message: error })
    }

}

const deleteResident = async (req, res) => {

    try {
        let resident = await knex.select('id').from('residents').where({ id: req.params.id })
        if (!resident.length) return sendStatus(404).send({ message: "Usuário não encontrado" })

        let token = req.headers.authorization.split(" ")[1]
        if (jwt.decode(token).admin === 0) return sendStatus(401).send({ message: "Usuário não tem permissões para exclusão" })

        await knex('residents').where({ id: req.params.id }).delete()
        res.send({ message: "Excluido com sucesso!" })
    } catch (error) {
        sendStatus(500).send({ message: error })
    }



}

export { getResident, getByIdResident, createResident, updateResident, deleteResident }
