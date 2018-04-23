import _ from 'lodash'
import Joi from 'joi'
import { respondResult, respondSuccess, respondErrors } from '../utils'
import Appointment from '../models/appointment'
var sendnotify = require('./notificationcontroller');

const availableFields = ['patient', 'slot', 'treatment', 'status', 'report']
const schema = Joi.object().keys({
    patient: Joi.string(),
    slot: Joi.string(),
    treatment: Joi.string(),
    status: Joi.string(),
    report: Joi.string().optional()
})

export const list = async(req, res) => {
    try {
        let appointments = await Appointment.find({ deleted: false }).deepPopulate('patient treatment report slot slot.dentist slot.clinic')

        sendnotify.Sendnoti("1", "");

        respondResult(res)(appointments)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const findById = async(req, res) => {
    try {
        const { _id } = req.body
        let appointment = await Appointment.findById({ _id }).deepPopulate('patient treatment report slot slot.dentist slot.clinic')

        respondResult(res)(appointment)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const create = async(req, res) => {
    const appointment = Joi.validate(req.body, schema).value

    try {
        const newAppointment = await Appointment.create(appointment)

        respondResult(res)(newAppointment)
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
            Appointment.create(item)

        });

        respondResult(res)("Success")
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const update = async(req, res) => {
    try {
        const { _id, ...body } = req.body
        const appointment = await Appointment.findById({ _id })
        const appointbefore = appointment

        _.map(availableFields, (field) => {
            appointment[field] = body[field] || appointment[field]
        })
        appointment.save()

        const appointafter = appointment
        sendnotify.updateStatus(appointafter, appointbefore)

        respondResult(res)(appointment)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const remove = async(req, res) => {
    try {
        const { _id } = req.body
        const appointment = await Appointment.findById({ _id })
        appointment.deleted = true
        appointment.save()

        respondSuccess(res)()
    } catch (err) {
        respondErrors(res)(err)
    }
}