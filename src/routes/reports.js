import { Router } from 'express'
import { list, create, update, remove, findById, findByPatientId, multiCreate } from '../controllers/report'

const router = Router()
router.post('/list', list)
router.post('/create', create)
router.post('/update', update)
router.post('/delete', remove)
router.post('/find', findById)
router.post('/findPatient', findByPatientId)
router.post('/multiCreate', multiCreate)

export default router