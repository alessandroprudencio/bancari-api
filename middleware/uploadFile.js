import { mkdirSync, existsSync } from "fs";
const upload = async (req, res) => {
    const { name, size, mimetype, md5 } = req.files.image
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
    if (!allowedMimes.includes(mimetype)) return res.status(400).send({ message: "Extensão de foto não permitida!" })
    if (size > 5 * (1024 * 1024)) return res.status(400).send('Tamanho de imagem não permitido')
    if (!existsSync("uploads")) mkdirSync("uploads", 0o776, (err) => { if (err) return res.status(500).send(err) })
    if (!existsSync("uploads/profile")) mkdirSync("uploads/profile", 0o776, (err) => { if (err) return res.status(500).send(err) })
    const nameFile = 'uploads/profile/' + md5 + (path.extname(name))
    try {
        await req.files.image.mv(nameFile)
        return nameFile
    } catch (err) {
        return res.status(500).send(err)
    }
}
export default upload