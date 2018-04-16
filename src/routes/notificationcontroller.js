import { Router } from 'express'
import { findById } from '../controllers/notificationcontroller'

const router = Router()
router.post('/getappoint', findById)

export default router