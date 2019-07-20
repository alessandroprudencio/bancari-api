import { getRealty, getByIdRealty, createRealty, updateRealty, deleteRealty } from '../controllers/realtyController'

const router = require('express').Router()

router
    .get('/', getRealty)
    .get('/:id', getByIdRealty)
    .post('/', createRealty)
    .put('/:id', updateRealty)
    .delete('/:id', deleteRealty)

export default router