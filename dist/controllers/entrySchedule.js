"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const qrCode = async (req, res) => {
  const {
    nome,
    cpf,
    placa_veiculo
  } = req.body;
  let token = await jwt.sign({
    cpf: cpf,
    nome: nome,
    placa_veiculo: placa_veiculo
  }, process.env.SECRET_TOKEN, {
    expiresIn: '1h'
  });

  try {
    await knex('entry_schedules').insert(req.body);
  } catch (error) {
    console.log(error);
  }

  const qr_code = qr.image(token, {
    type: 'svg'
  });
  res.type('svg');
  qr_code.pipe(res);
};

const authenticateEntry = async (req, res) => {
  let token_acsess = req.params.token;
  await jwt.verify(token_acsess, process.env.SECRET_TOKEN, err => {
    if (err) res.status(401).send({
      message: 'QR CODE Inválido ou expirados !'
    });
  });
  let decode = jwt.decode(token_acsess);
  let user = await knex('entry_schedules').select('name', 'cpf', 'placa_veiculo').where({
    cpf: decode.cpf
  });
  if (user.length) res.send({
    user: user,
    message: "Entrada autorizada"
  });else res.status(401).send({
    message: 'Entrada não agendada ou cancelada !'
  });
};

exports.qrCode = qrCode;
exports.authenticateEntry = authenticateEntry;
//# sourceMappingURL=entrySchedule.js.map