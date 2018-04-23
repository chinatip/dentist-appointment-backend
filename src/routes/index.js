import { Router } from 'express'
import dentists from './dentists'
import clinics from './clinics'
import treatments from './treatments'
import patients from './patients'
import appointments from './appointments'
import dentistTimeslot from './dentist-timeslots'
import reports from './reports'

import notificationcontroller from './notificationcontroller'

const router = Router()
router.get('/', (req, res) => {
    res.status(200).send({ status: 'API service is running.' })
})

router.use('/dentists', dentists)
router.use('/clinics', clinics)
router.use('/treatments', treatments)
router.use('/patients', patients)
router.use('/appointments', appointments)
router.use('/dentistTimeslots', dentistTimeslot)
router.use('/reports', reports)
router.use('/notification', notificationcontroller)

export default router