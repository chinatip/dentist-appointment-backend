import { Router } from 'express'
import dentist from './dentist'

const router = Router()
router.get('/', (req, res) => {
  res.status(200).send({ status: 'Server API Running' })
})

router.use('/dentist', dentist)

export default router
