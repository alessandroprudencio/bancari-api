"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _residentController = require("../controllers/residentController");

const router = require('express').Router();

router.get('/', _residentController.getResident).get('/:id', _residentController.getByIdResident).post('/', _residentController.createResident).put('/:id', _residentController.updateResident).delete('/:id', _residentController.deleteResident);
exports.default = router;
//# sourceMappingURL=residentRoute.js.map