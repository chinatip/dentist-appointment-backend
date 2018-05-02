import { Router } from 'express'
import { list, create, update, remove, findById, multiCreate } from '../controllers/dentist'
import auth from '../middlewares/auth'

const router = Router()
router.post('/list', auth, list)
router.post('/create', auth, create)
router.post('/update', auth, update)
router.post('/delete', auth, remove)
router.post('/find', auth, findById)
router.post('/multiCreate', multiCreate)

export default router