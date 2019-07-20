import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) return sendStatus(401).send({ message: 'Token não encontrado, por favor faça login !' })
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        jwt.verify(req.headers.authorization.split(" ")[1], process.env.SECRET_TOKEN, function (err, jwt) {
            if (err) return sendStatus(401).send({ message: err.message })
            next()
        })
    }
}

export default verifyToken