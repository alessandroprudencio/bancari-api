import { getUser, createUser, login, updateUser, deleteUser } from '../controllers/userController'

const router = require('express').Router()

router
    .get('/', getUser)
    .post('/', createUser)
    .post('/login', login)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)

export default router