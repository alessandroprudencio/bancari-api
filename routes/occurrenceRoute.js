import { getOccurrence, getByIdOccurrence , createOccurrence, updateOccurrence, deleteOccurrence } from '../controllers/occurrenceController'

const router = require('express').Router()

router
    .get('/', getOccurrence)
    .get('/:id', getByIdOccurrence)
    .post('/', createOccurrence)
    .put('/:id', updateOccurrence)
    .delete('/:id', deleteOccurrence)

export default router