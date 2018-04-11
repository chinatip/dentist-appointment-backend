import { Router } from 'express'
import { list, create, update, remove, findById } from '../controllers/patient'

const router = Router()
router.post('/list', list)
router.post('/create', create)
router.post('/update', update)
router.post('/delete', remove)
router.post('/find', findById)

export default router