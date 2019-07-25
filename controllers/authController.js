const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) return res.status(400).send({ message: 'Passe os dados e não me fo!@#!' })

    if (!validator.isEmail(email)) return res.status(400).send({ message: 'E-mail inválido' })

    let user = await knex('users').select('email', 'id', 'password', 'admin').whereRaw('email = ?', email)
    if (!user.length) return res.status(404).send({ message: 'E-mail não encontrado' })
    if (bcrypt.compareSync(req.body.password, user[0].password)) {
        delete user[0].password
        res.status(200).send({id:user[0].id, email: email, token: jwt.sign({ user: user[0] }, process.env.SECRET_TOKEN, { expiresIn: '1h' }) })
    } else res.status(401).send({ message: 'Dados inválidos' })

}

const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    if (!name || !email || !password || !confirmPassword) return res.status(400).send({ message: 'Por favor preencha todos os campos' })

    if (!validator.isEmail(email)) return res.status(400).send({ message: 'E-mail inválido' })
    if (password != confirmPassword) return res.status(400).send({ message: 'Senhas não coencidem!' })
    delete req.body.confirmPassword

    if (password.length <= 6) return res.status(400).send({ message: 'Senha muito curta..' })

    if (req.files && Object.keys(req.files).length != 0) req.body.image = await upload(req, res, 'profile', ['image/jpeg', 'image/pjpeg', 'image/png'])
    req.body.password = bcrypt.hashSync(password, 10)

    try {
        let user = await knex('users').insert(req.body).returning(['id', 'name', 'email', 'image', 'admin', 'morador', 'sindico'])
        if (user[0].admin == true) {
            await knex.raw(`CREATE DATABASE "${user[0].id.replace(/-/g, "_")}"`)
            await knex.migrate.latest([{ database: `"${user[0].id.replace(/-/g, "_")}"` }])
        }
        res.send({ message: "Usuário cadastrado com sucesso!", data: user })
    } catch (err) {
        console.log(err)
        if (err.code == '23505') return res.status(400).send({ message: `O e-mail '${req.body.email}' já esta em uso !` })
        res.status(500).send({ message: err })
    }
}

export { login, register }
