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

    await transporter.sendMail(mailOptions,(err, info)=>{
        if (err) {
          res.send(err)
        } else {
             res.send(`OK! E-mail para recuperação de senha enviado para o email  ${email}`)
        }
      });
}

export default forgotPassword
