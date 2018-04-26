import { Router } from 'express'
import { list, create, update, remove, findById, multiCreate, findClinicPatient } from '../controllers/clinic'

const router = Router()
router.post('/list', list)
router.post('/create', create)
router.post('/update', update)
router.post('/delete', remove)
router.post('/find', findById)
router.post('/patient', findClinicPatient)
router.post('/multiCreate', multiCreate)

export default router