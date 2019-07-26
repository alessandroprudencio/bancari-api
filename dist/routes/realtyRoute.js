"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _realtyController = require("../controllers/realtyController");

const router = require('express').Router();

router.get('/', _realtyController.getRealty).get('/:id', _realtyController.getByIdRealty).post('/', _realtyController.createRealty).put('/:id', _realtyController.updateRealty).delete('/:id', _realtyController.deleteRealty);
exports.default = router;
//# sourceMappingURL=realtyRoute.js.map