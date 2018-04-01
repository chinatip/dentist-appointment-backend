import { Router } from 'express'
import { list, create, update, remove } from '../controllers/dentist'

const router = Router()

router.get('/list', list)
router.get('/create', create)

router.post('/update', update)
router.post('/delete', remove)

export default router
