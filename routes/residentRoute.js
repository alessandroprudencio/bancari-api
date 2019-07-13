import { getResident, createResident, updateResident, deleteResident } from '../controllers/residentController'

const router = require('express').Router()

router
    .get('/', getResident)
    .post('/', createResident)
    .put('/:id', updateResident)
    .delete('/:id', deleteResident)

export default router