import { Router } from 'express'
import dentists from './dentists'
import clinics from './clinics'
import treatments from './treatments'
import patients from './patients'

const router = Router()
router.get('/', (req, res) => {
  res.status(200).send({ status: 'API service is running.' })
})

router.use('/dentists', dentists)
router.use('/clinics', clinics)
router.use('/treatments', treatments)
router.use('/patients', patients)

export default router