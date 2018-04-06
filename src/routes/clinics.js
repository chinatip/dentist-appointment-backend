import { Router } from 'express'
import { list, create, remove } from '../controllers/clinic'

const router = Router()
router.post('/list', list)
router.post('/create', create)
router.post('/remove', remove)

export default router