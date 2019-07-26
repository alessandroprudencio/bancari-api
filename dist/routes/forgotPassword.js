"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _forgotPassword = require("../controllers/forgotPassword");

var _forgotPassword2 = _interopRequireDefault(_forgotPassword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = require('express').Router();

router.post('/', _forgotPassword2.default);
exports.default = router;
//# sourceMappingURL=forgotPassword.js.map