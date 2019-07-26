"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _validator = require("validator");

var _validator2 = _interopRequireDefault(_validator);

var _nodemailer = require("nodemailer");

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _expressFileupload = require("express-fileupload");

var _expressFileupload2 = _interopRequireDefault(_expressFileupload);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _qrImage = require("qr-image");

var _qrImage2 = _interopRequireDefault(_qrImage);

var _verifyJwt = require("./middleware/verifyJwt");

var _verifyJwt2 = _interopRequireDefault(_verifyJwt);

var _authRoute = require("./routes/authRoute");

var _authRoute2 = _interopRequireDefault(_authRoute);

var _userRoute = require("./routes/userRoute");

var _userRoute2 = _interopRequireDefault(_userRoute);

var _residentRoute = require("./routes/residentRoute");

var _residentRoute2 = _interopRequireDefault(_residentRoute);

var _reservationRoute = require("./routes/reservationRoute");

var _reservationRoute2 = _interopRequireDefault(_reservationRoute);

var _realtyRoute = require("./routes/realtyRoute");

var _realtyRoute2 = _interopRequireDefault(_realtyRoute);

var _occurrenceRoute = require("./routes/occurrenceRoute");

var _occurrenceRoute2 = _interopRequireDefault(_occurrenceRoute);

var _expenditureRoute = require("./routes/expenditureRoute");

var _expenditureRoute2 = _interopRequireDefault(_expenditureRoute);

var _entryScheduleRoute = require("./routes/entryScheduleRoute");

var _entryScheduleRoute2 = _interopRequireDefault(_entryScheduleRoute);

var _forgotPassword = require("./routes/forgotPassword");

var _forgotPassword2 = _interopRequireDefault(_forgotPassword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").load();

const app = (0, _express2.default)();

var server = require('http').Server(app);

var io = require('socket.io')(server);

server.listen(process.env.PORT, () => {
  console.log('ouvindo porta ' + process.env.PORT);
});
io.on('connection', socket => global.socket = socket);
global.bcrypt = _bcrypt2.default;
global.jwt = _jsonwebtoken2.default;
global.validator = _validator2.default;
global.nodemailer = _nodemailer2.default;
global.path = _path2.default;
global.qr = _qrImage2.default;
global.knex = require('knex')(require('./db/knexfile')[process.env.NODE_ENV || 'development']);
app.disable('x-powered-by');
app.use((0, _cors2.default)());
app.options('*', (0, _cors2.default)());
app.use((0, _expressFileupload2.default)());
app.use(_bodyParser2.default.urlencoded({
  extended: false
}));
app.use(_bodyParser2.default.json());
app.use('/', _authRoute2.default);
app.use('/user', _verifyJwt2.default, _userRoute2.default);
app.use('/resident', _verifyJwt2.default, _residentRoute2.default);
app.use('/reservation', _verifyJwt2.default, _reservationRoute2.default);
app.use('/realty', _verifyJwt2.default, _realtyRoute2.default);
app.use('/occurrence', _verifyJwt2.default, _occurrenceRoute2.default);
app.use('/expenditure', _verifyJwt2.default, _expenditureRoute2.default);
app.use('/entry_schedule', _entryScheduleRoute2.default);
app.use('/forgotPassword', _forgotPassword2.default);
app.use('/uploads', _verifyJwt2.default, _express2.default.static(_path2.default.resolve(__dirname, '.')));
app.use('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
//# sourceMappingURL=index.js.map