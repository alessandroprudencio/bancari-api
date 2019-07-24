import upload from '../middleware/uploadFile'

const getUser = async (req, res) => {
    try {
        res.send(await knex.select('id', 'name', 'email', 'admin', 'image').from('users'))
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const getUserByIdUser = async (req, res) => {
    try {
        res.send(await knex.select('id', 'name', 'email', 'admin', 'image').from('users').where({ id: req.params.id }))
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const createUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    if (!name || !email || !password || !confirmPassword) return res.status(400).send({ message: 'Por favor preencha todos os campos' })

    if (!validator.isEmail(email)) return res.status(400).send({ message: 'E-mail inválido' })
    if (password != confirmPassword) return res.status(400).send({ message: 'Senhas não coencidem!' })
    delete req.body.confirmPassword

    if (password.length <= 6) return res.status(400).send({ message: 'Senha muito curta..' })

    if (req.files && Object.keys(req.files).length != 0)req.body.image = await upload(req, res, 'profile', ['image/jpeg', 'image/pjpeg', 'image/png'])
    req.body.password = bcrypt.hashSync(password, 10)

    try {
        let user =  await knex('users').insert(req.body).returning(['id','name','email','image','admin'])
        if(user.shift().admin==true){
            await knex.raw(`CREATE DATABASE "${user.shift().id.replace(/-/g, "_")}"`)
            await knex.migrate.latest([{database:`"${user.shift().id.replace(/-/g, "_")}"`}])
        }
        res.send({ message: "Usuário cadastrado com sucesso!", data: user })
    } catch (err) {
        console.log(err)
        if(err.code =='23505')return res.status(400).send({message:`O e-mail '${req.body.email}' já esta em uso !`})
        res.status(500).send({ message: err })
    }

}

const updateUser = async (req, res) => {
    const { password } = req.body

    if (password) req.body.password = bcrypt.hashSync(password, 10)

    try {
        await knex('users').update(req.body)
        res.send({ message: "Atualizado com sucesso!" })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const deleteUser = async (req, res) => {

    try {
        let user = await knex.select('id').from('users').where({ id: req.params.id })
        if (!user.length) res.status(404).send({ message: "Usuário não encontrado" })
        let token = req.headers.authorization.split(" ")[1]
        if (jwt.decode(token).admin === false) return res.status(401).send({ message: "Usuário não tem permissões para exclusão" })
        await knex('users').where({ id: req.params.id }).delete()
        res.send({ message: "Excluido com sucesso!" })
    } catch (err) {
        res.status(500).send({ message: err })
    }


}

export { getUser, getUserByIdUser, createUser, updateUser, deleteUser }
