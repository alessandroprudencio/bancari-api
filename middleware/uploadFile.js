const upload = async (req, res) => {
    const { name, size, mimetype, md5 } = req.files.image
    var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
    if (!allowedMimes.includes(mimetype)) return status(400).send({ message: "Extensão de foto não permitida!" })
    if (size > 5 * (1024 * 1024)) return status(400).send('Tamanho de imagem não permitido')
    const nameFile = md5 + (path.extname(name))
    await req.files.image.mv(__dirname + '../../uploads/profile/' + nameFile,(err)=>{
        if(err)return status(500).send(err)
        return nameFile
    })
}
export default upload