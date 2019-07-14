import { getReservation, getByIdReservation, createReservation, updateReservation, deleteReservation } from '../controllers/reservationController'

const router = require('express').Router()

router
    .get('/', getReservation)
    .get('/:id', getByIdReservation)
    .post('/', createReservation)
    .put('/:id', updateReservation)
    .delete('/:id', deleteReservation)

export default router