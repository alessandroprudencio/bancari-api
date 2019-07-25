import { getExpenditure, getByIdExpenditure , createExpenditure, updateExpenditure, deleteExpenditure } from '../controllers/expenditureController'

const router = require('express').Router()

router
    .get('/', getExpenditure)
    .get('/:id', getByIdExpenditure)
    .post('/', createExpenditure)
    .put('/:id', updateExpenditure)
    .delete('/:id', deleteExpenditure)

export default router