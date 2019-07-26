"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _authController = require("../controllers/authController");

const router = require('express').Router();

router.post('/login', _authController.login).post('/register', _authController.register);
exports.default = router;
//# sourceMappingURL=authRoute.js.map