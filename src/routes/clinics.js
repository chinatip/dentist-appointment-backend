import { Router } from 'express'
import { list } from '../controllers/clinic'

const router = Router()
router.get('/list', list)

export default router