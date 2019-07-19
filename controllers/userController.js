import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const knex = require('knex')(require('../db/knexfile')[process.env.NODE_ENV || 'development'])

import validator from 'validator'

// import nodemailer from 'nodemailer'

import multer from 'multer'
import path from 'path'

const getUser =async (req, res) => {
    let data = await(knex.select('id', 'name', 'email', 'admin', 'image', 'created_at').from('users'))
    res.send(data)
}

const getUserByIdUser = (req, res) => {
    knex.select('id', 'name', 'email', 'admin').from('users').where({id:req.params.id})
        .then(data => {
            res.send(data)
        }).catch(err => res.send(err))

}

const createUser = async (req, res) => {
    const upload = multer({
        storage: multer.diskStorage({
            destination: './uploads/profile',
            filename: (req, file, next) => {
                next(null, file.fieldname + '_' + Date.now() + (path.extname(file.originalname)))
            }
        }),
        limits: { fileSize: 5 * (1024 * 1024) },
        fileFilter: (req, file, next) => {
            var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
            if (allowedMimes.includes(file.mimetype)) next(null, true)
            else return res.status(400).send({ message: "Extensão de foto não permitida!" })
        }
    }).single('image')

    upload(req, res, err => {

        const { name, email, password, confirmPassword } = req.body

        if (err) return res.status(400).send({ message: err.message + ' : ' + err.field })
        if(req.file) req.body.image = req.file.path

        if (!name || !email || !password || !confirmPassword) return res.status(400).send({ message: 'Por favor preencha todos os campos' })

        if (!validator.isEmail(email)) return res.status(400).send({ message: 'E-mail inválido' })
        if (password != confirmPassword) return res.status(400).send({ message: 'Senhas não coencidem!' })
        else delete req.body.confirmPassword
    
        if (password.length <= 6) return res.status(400).send({ message: 'Senha muito curta..' })
        req.body.password = bcrypt.hashSync(password, 10)

        knex('users').insert(req.body)
        .then(() => {
            res.json({ message: "Usuário cadastrado com sucesso!" })
        }).catch(error => {
            console.log(error)
        })
    })


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

const updateUser = (req, res) => {
    const { password } = req.body

    if (req.body.password) req.body.password = bcrypt.hashSync(password, 10)

    knex('users').update(req.body)
        .then(() => res.send({ message: "Atualizado com sucesso!" }))
        .catch(err => res.status(400).send({ message: err.sqlMessage }))
}

const deleteUser = (req, res) => {

    knex.select('id').from('users').where({ id: req.params.id })
        .then(user => {
            if (!user.length) res.status(404).send({ message: "Usuário não encontrado" })

            let token = req.headers.authorization.split(" ")[1]
            if (jwt.decode(token).admin === 0) return res.status(401).send({ message: "Usuário não tem permissões para exclusão" })

            knex('user ').where({ id: req.params.id }).delete()
                .then(() => res.send({ message: "Excluido com sucesso!" }))
                .catch(err => res.status(400).send({ message: err.sqlMessage }))

        }).catch(err => res.status(400).send(err))


}

export { getUser, getUserByIdUser,  createUser, updateUser, deleteUser }
