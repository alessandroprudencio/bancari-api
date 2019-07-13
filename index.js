import express from 'express'
const app = express()

require("dotenv").load();

import bodyParser from 'body-parser'
app.use(bodyParser.json())

import verifyJwt from './middleware/verifyJwt'

import userRoute from './routes/userRoute'
app.use('/user', verifyJwt, userRoute)

import authRoute from './routes/authRoute'
app.use('/auth', authRoute)

app.listen(process.env.PORT, () => {
    console.log('Servidor rodando ' + process.env.PORT)
})


