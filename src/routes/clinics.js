import { Router } from 'express'
import { list, create, update, remove, findById, multiCreate, login, findClinicPatient } from '../controllers/clinic'
import auth from '../middlewares/auth'

const router = Router()
router.post('/list', list)
router.post('/create', create)
router.post('/update', update)
router.post('/delete', remove)
router.post('/find', auth, findById)
router.post('/patients', auth, findClinicPatient)
router.post('/multiCreate', multiCreate)
router.post('/login', login)

export default router