import _ from 'lodash'
import Joi from 'joi'
import { respondResult, respondSuccess, respondErrors } from '../utils'
import Clinic from '../models/clinic'
import Appointment from '../models/appointment'

var sendnotify = require('./notificationcontroller');

const availableFields = ['name', 'phone', 'address', 'dentists']
const schema = Joi.object().keys({
    name: Joi.string(),
    phone: Joi.string(),
    address: Joi.object().optional(),
    dentists: [Joi.string()]
})

export const list = async(req, res) => {
    try {
        const clinics = await Clinic.find({ deleted: false }).deepPopulate('dentists dentists.treatments')

        respondResult(res)(clinics)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const findById = async(req, res) => {
    try {
        const { _id } = req.body
        const clinic = await Clinic.findById({ _id }).deepPopulate('dentists dentists.treatments')

        respondResult(res)(clinic)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const create = async(req, res) => {
    const clinic = Joi.validate(req.body, schema).value

    try {
        const newClinic = await Clinic.create(clinic)

        respondResult(res)(newClinic)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const multiCreate = async(req, res) => {
    const list = req.body;

    try {
        list.forEach(element => {
            const item = Joi.validate(element, schema).value
            console.log(item);
            Clinic.create(item)

        });

        respondResult(res)("Success")
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const update = async(req, res) => {
    try {
        const { _id, ...body } = req.body
        const clinic = await Clinic.findById({ _id })
        _.map(availableFields, (field) => {
            clinic[field] = body[field] || clinic[field]
        })
        clinic.save()

        respondResult(res)(clinic)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const remove = async(req, res) => {
    try {
        const { _id } = req.body
        const clinic = await Clinic.findById({ _id })
        clinic.deleted = true
        clinic.save()

        respondSuccess(res)()
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const findClinicPatient = async(req, res) => {
    try {
        const { _id } = req.body
        let appointments = await Appointment.find({ deleted: false }).deepPopulate('patient slot slot.clinic')
        let patients = _.map(appointments, (app) => {
            const { slot, patient } = app

            if (slot.clinic._id == _id) {
                return patient
            }
        })

        patients = _.filter(patients, (p) => p)
        patients = _.uniqBy(patients, '_id')
        respondResult(res)(patients)
    } catch (err) {
        respondErrors(res)(err)
    }
}