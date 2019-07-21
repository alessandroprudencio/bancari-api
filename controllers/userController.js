import upload from '../middleware/uploadFile'

const getUser = async (req, res) => {
    try {
        res.send(await knex.select('id', 'name', 'email', 'admin', 'image').from('users'))
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

const getUserByIdUser = async (req, res) => {
    try {
        res.send(await knex.select('id', 'name', 'email', 'admin', 'image').from('users').where({ id: req.params.id }))
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

const createUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    if (!name || !email || !password || !confirmPassword) return res.status(400).send({ message: 'Por favor preencha todos os campos' })

    if (!validator.isEmail(email)) return res.status(400).send({ message: 'E-mail inválido' })
    if (password != confirmPassword) return res.status(400).send({ message: 'Senhas não coencidem!' })
    else delete req.body.confirmPassword

    if (password.length <= 6) return res.status(400).send({ message: 'Senha muito curta..' })

    if (Object.keys(req.files).length != 0)req.body.image = await upload(req, res, 'profile', ['image/jpeg', 'image/pjpeg', 'image/png'])
    req.body.password = bcrypt.hashSync(password, 10)

    try {
        await knex('users').insert(req.body)
        res.json({ message: "Usuário cadastrado com sucesso!" })
    } catch (error) {
        if(error.code =='23505')return res.status(400).send({message:`O e-mail '${req.body.email}' já esta em uso !`})
        res.status(500).send({ message: error })
    }


    // const transporter = await nodemailer.createTransport({
    //     service:process.env.EMAIL_service,
    //     port: process.env.EMAIL_port,
    //     auth: {
    //         user: process.env.EMAIL_user,
    //         pass: process.env.EMAIL_pass
    //     }
    //   })

    // const mailOptions = {
    //     from: 'gestao_condominio@bancari.com.br',
    //     to: email,
    //     subject: 'Confirmação de Email Bancari Gestão Condominio',
    //     html: `
    //         <p>Por favor confirme seu email clicando no link <a href="${process.env.CLIENT_URL}">${process.env.CLIENT_URL}</a></p>

    //     `
    // };

    // await transporter.sendMail(mailOptions,(error, info)=>{
    //     if (error) {
    //       res.send(error)
    //     } else {
    //      res.send('Email enviado: ' + info.response);
    //     }
    //   });
    //   return


}

const updateUser = async (req, res) => {
    const { password } = req.body

    if (password) req.body.password = bcrypt.hashSync(password, 10)

    try {
        await knex('users').update(req.body)
        res.send({ message: "Atualizado com sucesso!" })
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

const deleteUser = async (req, res) => {

    try {
        let user = await knex.select('id').from('users').where({ id: req.params.id })
        if (!user.length) res.status(404).send({ message: "Usuário não encontrado" })
        let token = req.headers.authorization.split(" ")[1]
        if (jwt.decode(token).admin === false) return res.status(401).send({ message: "Usuário não tem permissões para exclusão" })
        await knex('user').where({ id: req.params.id }).delete()
        res.send({ message: "Excluido com sucesso!" })
    } catch (error) {
        res.status(500).send({ message: error })
    }


}

export { getUser, getUserByIdUser, createUser, updateUser, deleteUser }
