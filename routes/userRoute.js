import { getUser, getUserByIdUser , createUser, updateUser, deleteUser } from '../controllers/userController'

const router = require('express').Router()

router
    .get('/', getUser)
    .get('/:id', getUserByIdUser)
    .post('/', createUser)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)

export default router