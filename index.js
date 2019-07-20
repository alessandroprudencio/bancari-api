import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import nodemailer from 'nodemailer'

global.knex = require('knex')(require('./db/knexfile')[process.env.NODE_ENV || 'development'])
global.bcrypt = bcrypt
global.jwt = jwt
global.validator = validator
global.nodemailer = nodemailer

require("dotenv").load();

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

import verifyJwt from './middleware/verifyJwt'

import authRoute from './routes/authRoute'
app.use('/login', authRoute)

app.use('*', verifyJwt)

import userRoute from './routes/userRoute'
app.use('/user', userRoute)

app.use('/', express.static(path.resolve(__dirname, '.')))

import residentRoute from './routes/residentRoute'
app.use('/resident',, residentRoute)

import reservationRoute from './routes/reservationRoute'
app.use('/reservation',, reservationRoute)

import realtyRoute from './routes/realtyRoute'
app.use('/realty',, realtyRoute)

app.use('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.listen(process.env.PORT, () => { console.log('Servidor iniciado ' + process.env.PORT) })


