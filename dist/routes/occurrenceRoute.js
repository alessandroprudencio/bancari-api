"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _occurrenceController = require("../controllers/occurrenceController");

const router = require('express').Router();

router.get('/', _occurrenceController.getOccurrence).get('/:id', _occurrenceController.getByIdOccurrence).post('/', _occurrenceController.createOccurrence).put('/:id', _occurrenceController.updateOccurrence).delete('/:id', _occurrenceController.deleteOccurrence);
exports.default = router;
//# sourceMappingURL=occurrenceRoute.js.map