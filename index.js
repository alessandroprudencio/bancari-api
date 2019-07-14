import express from 'express'
const app = express()

require("dotenv").load();

import bodyParser from 'body-parser'
app.use(bodyParser.json())

import verifyJwt from './middleware/verifyJwt'

import userRoute from './routes/userRoute'
app.use('/user', verifyJwt, userRoute)

import residentRoute from './routes/residentRoute'
app.use('/resident', verifyJwt, residentRoute)

app.use('/', (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.get('*', function(req, res){
    res.status(404).send({message:"Xupim essa rota não existe"});
  });
  

app.listen(process.env.PORT, () => {
    console.log('Servidor iniciado ' + process.env.PORT)
})


