import { getResident, getByIdResident , createResident, updateResident, deleteResident } from '../controllers/residentController'

const router = require('express').Router()

router
    .get('/', getResident)
    .getById('/', getByIdResident)
    .post('/', createResident)
    .put('/:id', updateResident)
    .delete('/:id', deleteResident)

export default router