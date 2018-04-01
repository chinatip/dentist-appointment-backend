import { Router } from 'express'
import { list } from '../controllers/patient'

const router = Router()
router.get('/list', list)

export default router