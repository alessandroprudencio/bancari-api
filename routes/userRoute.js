import { getUser, createUser, updateUser, deleteUser } from '../controllers/userController'

const router = require('express').Router()

router
    .get('/', getUser)
    .post('/', createUser)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)

export default router