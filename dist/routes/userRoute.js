"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userController = require("../controllers/userController");

const router = require('express').Router();

router.get('/', _userController.getUser).get('/:id', _userController.getUserByIdUser).post('/', _userController.createUser).put('/:id', _userController.updateUser).delete('/:id', _userController.deleteUser);
exports.default = router;
//# sourceMappingURL=userRoute.js.map