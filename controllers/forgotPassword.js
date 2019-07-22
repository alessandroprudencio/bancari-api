const forgotPassword = async (req, res) => {
    const { email } = req.body

    let existEmail = await knex.select('email','name').from('users').where({ email: req.body.email })
    if(!existEmail.length)res.status(400).send("Email não cadastrado")

    let tokenForgotPassword = jwt.sign({email:email}, process.env.SECRET_TOKEN, { expiresIn: '1h' })

    const transporter = await nodemailer.createTransport({
        service:process.env.EMAIL_service,
        port: process.env.EMAIL_port,
        auth: {
            user: process.env.EMAIL_user,
            pass: process.env.EMAIL_pass
        }
      })

    const mailOptions = {
        from: 'gestao_condominio@bancari.com.br',
        to: email,
        subject: 'Recuperação de Senha - Bancari Gestão Condominio',
        html: `
        <html>
           Ola ${existEmail[0].name},  <br><br>

            <p>Por favor clique no link para redefinir sua senha <a href="${process.env.CLIENT_URL}/${tokenForgotPassword}">${process.env.CLIENT_URL}/${tokenForgotPassword}</a></p>
            <br>
            <br>
            <b>Att, Bancari Gestão de condominios </b>
        </html>
        `
    };

    await transporter.sendMail(mailOptions,(error, info)=>{
        if (error) {
          res.send(error)
        } else {
             res.send(`OK! E-mail para recuperação de senha enviado para o email  ${email}`)
        }
      });
      return

    if (!email || !password) return res.status(400).send({ message: 'Passe os dados e não me fo!@#!' })

    if (!validator.isEmail(email)) return res.status(400).send({ message: 'E-mail inválido' })

    let user = await knex('users').select('email', 'password', 'admin').whereRaw('email = ?', email)
    if (!user.length) return res.status(404).send({ message: 'E-mail não encontrado' })

    if (bcrypt.compareSync(req.body.password, user[0].password)) return res.status(200).send({ email: email, token: jwt.sign({ user: req.body, admin: user[0].admin }, process.env.SECRET_TOKEN, { expiresIn: '1h' }) })
    else res.status(401).send({ message: 'Dados inválidos' })

}

export default forgotPassword
