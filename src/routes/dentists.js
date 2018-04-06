import { Router } from 'express'
import { list, create, update, remove } from '../controllers/dentist'

const router = Router()
router.post('/list', list)
router.post('/create', create)
router.post('/update', update)
router.post('/delete', remove)

export default router