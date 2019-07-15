import express from 'express'
const app = express()

require("dotenv").load();

import bodyParser from 'body-parser'
app.use(bodyParser.json())

import verifyJwt from './middleware/verifyJwt'

import authRoute from './routes/authRoute'
app.use('/login', authRoute)

import userRoute from './routes/userRoute'
app.use('/user', verifyJwt, userRoute)

import residentRoute from './routes/residentRoute'
app.use('/resident', verifyJwt, residentRoute)

import reservationRoute  from './routes/reservationRoute'
app.use('/reservation', verifyJwt, reservationRoute)

app.use('/', (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.listen(process.env.PORT, () => {console.log('Servidor iniciado ' + process.env.PORT || 3000)})


