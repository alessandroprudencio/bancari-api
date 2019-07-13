import jwt from 'jsonwebtoken'

const verifyToken = async (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).send({ message: 'Token não encontrado' })
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        jwt.verify(req.headers.authorization.split(" ")[1], process.env.SECRET_TOKEN, function (err, jwt) {
            if (err) return res.status(401).send({ message: err.message })
            next()
        })
    }
}

export default verifyToken