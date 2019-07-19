import express from 'express'
import path from 'path'
const app = express()

require("dotenv").load();

import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

import verifyJwt from './middleware/verifyJwt'

import authRoute from './routes/authRoute'
app.use('/login', authRoute)

import userRoute from './routes/userRoute'
app.use('/user',verifyJwt, userRoute)

app.use('/file', express.static(path.resolve(__dirname, '.')))

import residentRoute from './routes/residentRoute'
app.use('/resident', verifyJwt, residentRoute)

import reservationRoute  from './routes/reservationRoute'
app.use('/reservation', verifyJwt, reservationRoute)

app.use('/', (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.listen(process.env.PORT, () => {console.log('Servidor iniciado ' + process.env.PORT)})


