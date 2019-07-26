import { qrCode, authenticateEntry }  from '../controllers/entrySchedule'

const router = require('express').Router()

router
    .post('/', qrCode)
    .get('/:token', authenticateEntry)

export default router