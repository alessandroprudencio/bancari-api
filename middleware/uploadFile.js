import { mkdirSync, existsSync } from "fs";
const upload = async (req, res, type, allowedMimes) => {
    if(req.files.file==undefined)return res.status(400).send({message:`Nome do input inválido, por favor forneça: 'file' `})
    const { name, size, mimetype, md5 } = req.files.file
    if (!allowedMimes.includes(mimetype)) return res.status(400).send({ message: "Tipo de arquivo enviado não permitido !" })
    if (size > 5 * (1024 * 1024)) return res.status(400).send('Tamanho de arquivo não permitido !')
    if (!existsSync("uploads")) mkdirSync("uploads", 0o776, (err) => { if (err) return res.status(500).send(err) })
    if (!existsSync(`uploads/${type}`)) mkdirSync(`uploads/${type}`, 0o776, (err) => { if (err) return res.status(500).send(err) })
    const nameFile = `uploads/${type}/` + md5 + (path.extname(name))
    try {
        await req.files.file.mv(nameFile)
        return nameFile
    } catch (err) {
        return res.status(500).send(err)
    }
}
export default upload