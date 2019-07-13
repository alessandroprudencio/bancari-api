import express from 'express'
const app = express()

require("dotenv").load();

import bodyParser from 'body-parser'
app.use(bodyParser.json())

import verifyJwt from './middleware/verifyJwt'

import userRoute from './routes/userRoute'
app.use('/user', userRoute)

import authRoute from './routes/authRoute'
app.use('/auth',  authRoute)

app.use('/', (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.listen(process.env.PORT, () => {
    console.log('Servidor iniciado ' + process.env.PORT)
})


