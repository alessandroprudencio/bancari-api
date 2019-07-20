const upload =async (req,res)=>{
    const { name, size, mimetype, md5 } = req.files.image
    var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
    if (!allowedMimes.includes(mimetype)) return res.status(400).send({ message: "Extensão de foto não permitida!" })
    if(size > 5 * (1024 * 1024))return res.status(400).send('Tamanho de imagem não permitido')
    try {
        await req.files.image.mv(__dirname + '../../uploads/profile/' + md5 + (path.extname(name)))
    }catch(err){
        console.log(err)
        res.status(500).send(err)    
    }
}
export default upload