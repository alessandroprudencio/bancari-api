const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) return sendStatus(400).send({ message: 'Passe os dados e não me fo!@#!' })

    if (!validator.isEmail(email)) return sendStatus(400).send({ message: 'E-mail inválido' })

    let user = await knex('users').select('email', 'password', 'admin').whereRaw('email = ?', email)
    if (!user.length) return sendStatus(404).send({ message: 'E-mail não encontrado' })

    if (bcrypt.compareSync(req.body.password, user[0].password)) return sendStatus(200).send({ email: email, token: jwt.sign({ user: req.body, admin: user[0].admin }, process.env.SECRET_TOKEN, { expiresIn: '1h' }) })
    else sendStatus(401).send({ message: 'Dados inválidos' })

}

export default login
