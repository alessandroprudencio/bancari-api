import { login } from '../controllers/authController'

const router = require('express').Router()

router
    .post('/', (req,res)=>{
        res.send('até aqi entrou')
    })

export default router