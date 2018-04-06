import { Router } from 'express'
import { list } from '../controllers/treatment'

const router = Router()
router.post('/list', list)

export default router