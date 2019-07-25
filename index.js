import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import nodemailer from 'nodemailer'
import upload from 'express-fileupload'
import cors from 'cors'
require("dotenv").load();

const app = express()

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(process.env.PORT)
 
io.on('connection', socket=>global.socket =  socket)
global.bcrypt = bcrypt
global.jwt = jwt
global.validator = validator
global.nodemailer = nodemailer
global.path = path
global.knex = require('knex')(require('./db/knexfile')[process.env.NODE_ENV || 'development'])


app.disable('x-powered-by');
app.use(cors())
app.options('*', cors())
app.use(upload())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

import verifyJwt from './middleware/verifyJwt'

import authRoute from './routes/authRoute'
app.use('/', authRoute)

import userRoute from './routes/userRoute'
app.use('/user',verifyJwt, userRoute)

import residentRoute from './routes/residentRoute'
app.use('/resident', verifyJwt, residentRoute)

import reservationRoute from './routes/reservationRoute'
app.use('/reservation', verifyJwt, reservationRoute)

import realtyRoute from './routes/realtyRoute'
app.use('/realty', verifyJwt, realtyRoute)

import occurrenceRoute from './routes/occurrenceRoute'
app.use('/occurrence',verifyJwt, occurrenceRoute)

import expenditureRoute from './routes/expenditureRoute'
app.use('/expenditure',verifyJwt, expenditureRoute)

import forgotPassword from './routes/forgotPassword'
app.use('/forgotPassword', forgotPassword)

app.use('/uploads', verifyJwt, express.static(path.resolve(__dirname, '.')))

app.use('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})



