"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _entrySchedule = require("../controllers/entrySchedule");

const router = require('express').Router();

router.post('/', _entrySchedule.qrCode).get('/:token', _entrySchedule.authenticateEntry);
exports.default = router;
//# sourceMappingURL=entryScheduleRoute.js.map