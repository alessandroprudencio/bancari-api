"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).send({
    message: 'Token não encontrado, por favor faça login !'
  });

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    _jsonwebtoken2.default.verify(req.headers.authorization.split(" ")[1], process.env.SECRET_TOKEN, function (err, jwt) {
      if (err) return res.status(401).send({
        message: err.message
      });
      next();
    });
  }
};

exports.default = verifyToken;
//# sourceMappingURL=verifyJwt.js.map