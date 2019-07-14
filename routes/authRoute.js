import { login } from '../controllers/authController'

const router = require('express').Router()

router
    .get('/', login)

export default router