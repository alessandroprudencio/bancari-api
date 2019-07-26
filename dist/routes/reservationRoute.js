"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reservationController = require("../controllers/reservationController");

const router = require('express').Router();

router.get('/', _reservationController.getReservation).get('/:id', _reservationController.getByIdReservation).post('/', _reservationController.createReservation).put('/:id', _reservationController.updateReservation).delete('/:id', _reservationController.deleteReservation);
exports.default = router;
//# sourceMappingURL=reservationRoute.js.map