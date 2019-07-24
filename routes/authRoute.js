import {login, register}  from '../controllers/authController'

const router = require('express').Router()

router
    .post('/login', login)
    .post('/register', register)

export default router