import { Router } from 'express'
import { list } from '../controllers/patient'

const router = Router()
router.post('/list', list)

export default router