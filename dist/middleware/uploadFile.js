"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require("fs");

const upload = async (req, res, type, allowedMimes) => {
  if (req.files.file == undefined) return res.status(400).send({
    message: `Nome do input inválido, por favor forneça: 'file' `
  });
  const {
    name,
    size,
    mimetype,
    md5
  } = req.files.file;
  if (!allowedMimes.includes(mimetype)) return res.status(400).send({
    message: "Tipo de arquivo enviado não permitido !"
  });
  if (size > 5 * (1024 * 1024)) return res.status(400).send('Tamanho de arquivo não permitido !');
  if (!(0, _fs.existsSync)("uploads")) (0, _fs.mkdirSync)("uploads", 0o776, err => {
    if (err) return res.status(500).send(err);
  });
  if (!(0, _fs.existsSync)(`uploads/${type}`)) (0, _fs.mkdirSync)(`uploads/${type}`, 0o776, err => {
    if (err) return res.status(500).send(err);
  });
  const nameFile = `${type}/` + md5 + path.extname(name);

  try {
    await req.files.file.mv('uploads/' + nameFile);
    return nameFile;
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.default = upload;
//# sourceMappingURL=uploadFile.js.map