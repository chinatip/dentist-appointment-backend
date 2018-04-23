import { Router } from 'express'
import { list, create, update, remove, findById, multiCreate } from '../controllers/appointment'

const router = Router()
router.post('/list', list)
router.post('/create', create)
router.post('/update', update)
router.post('/delete', remove)
router.post('/find', findById)
router.post('/multiCreate', multiCreate)

export default router