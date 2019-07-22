import forgotPassword  from '../controllers/forgotPassword'

const router = require('express').Router()

router
    .post('/', forgotPassword)

export default router