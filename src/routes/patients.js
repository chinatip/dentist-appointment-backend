import { Router } from 'express'
import { list, create, update, remove, findById, findByFBId, multicreate } from '../controllers/patient'

const router = Router()
router.post('/list', list)
router.post('/create', create)
router.post('/update', update)
router.post('/delete', remove)
router.post('/find', findById)
router.post('/findFB', findByFBId)
router.post('/multicreate', multicreate)

export default router