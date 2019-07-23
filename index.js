import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import nodemailer from 'nodemailer'
import upload from 'express-fileupload'
import cors from 'cors'

global.knex = require('knex')(require('./db/knexfile')[process.env.NODE_ENV || 'development'])
global.bcrypt = bcrypt
global.jwt = jwt
global.validator = validator
global.nodemailer = nodemailer
global.path = path

require("dotenv").load();

const app = express()

app.disable('x-powered-by');
app.use(cors())
app.options('*', cors())
app.use(upload())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

import verifyJwt from './middleware/verifyJwt'

import authRoute from './routes/authRoute'
app.use('/login', authRoute)

import userRoute from './routes/userRoute'
app.use('/user', userRoute)

import residentRoute from './routes/residentRoute'
app.use('/resident', verifyJwt, residentRoute)

import reservationRoute from './routes/reservationRoute'
app.use('/reservation', verifyJwt, reservationRoute)

import realtyRoute from './routes/realtyRoute'
app.use('/realty', verifyJwt, realtyRoute)

import forgotPassword from './routes/forgotPassword'
app.use('/forgotPassword', forgotPassword)

app.use('/uploads',verifyJwt, express.static(path.resolve(__dirname, '.')))

app.use('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.listen(process.env.PORT, () => { console.log('Servidor iniciado ' + process.env.PORT) })


