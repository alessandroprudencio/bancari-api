import express from 'express'
const app = express()
const path = require('path')

require("dotenv").load();

import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json())

import verifyJwt from './middleware/verifyJwt'

import authRoute from './routes/authRoute'
app.use('/login', authRoute)

import userRoute from './routes/userRoute'
app.use('/user',verifyJwt, userRoute)

app.use('/file', verifyJwt, express.static(path.resolve(__dirname, '.', 'uploads', 'profile')))

import residentRoute from './routes/residentRoute'
app.use('/resident', verifyJwt, residentRoute)

import reservationRoute  from './routes/reservationRoute'
import { dirname } from 'path';
app.use('/reservation', verifyJwt, reservationRoute)

app.use('/', (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.listen(process.env.PORT, () => {console.log('Servidor iniciado ' + process.env.PORT)})


