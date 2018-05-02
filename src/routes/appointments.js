import { Router } from 'express'
import { list, create, update, remove, findById, findByFBId, multiCreate } from '../controllers/appointment'
import auth from '../middlewares/auth'

const router = Router()
router.post('/list', auth, list)
router.post('/create', auth, create)
router.post('/update', auth, update)
router.post('/delete', remove)
router.post('/find', auth, findById)
router.post('/findFB', auth, findByFBId)
router.post('/multiCreate', multiCreate)

export default router