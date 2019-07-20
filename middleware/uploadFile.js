const upload = multer({
    storage: multer.diskStorage({
        destination: './uploads/profile',
        filename: (req, file, next) => {
            next(null, file.fieldname + '_' + Date.now() + (path.extname(file.originalname)))
        }
    }),
    limits: { fileSize: 5 * (1024 * 1024) },
    fileFilter: (req, file, next) => {
        var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
        if (allowedMimes.includes(file.mimetype)) next(null, true)
        else return res.status(400).send({ message: "Extensão de foto não permitida!" })
    }
}).single('image')

export default upload