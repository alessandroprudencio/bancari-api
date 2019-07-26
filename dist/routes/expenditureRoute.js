"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expenditureController = require("../controllers/expenditureController");

const router = require('express').Router();

router.get('/', _expenditureController.getExpenditure).get('/:id', _expenditureController.getByIdExpenditure).post('/', _expenditureController.createExpenditure).put('/:id', _expenditureController.updateExpenditure).delete('/:id', _expenditureController.deleteExpenditure);
exports.default = router;
//# sourceMappingURL=expenditureRoute.js.map