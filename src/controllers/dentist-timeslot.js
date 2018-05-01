import _ from 'lodash'
import Joi from 'joi'
import { respondResult, respondSuccess, respondErrors } from '../utils'
import DentistTimeslot from '../models/dentist-timeslot'

const availableFields = ['dentist', 'clinic', 'startTime', 'endTime']
const schema = Joi.object().keys({
    dentist: Joi.string(),
    clinic: Joi.string(),
    startTime: Joi.date(),
    endTime: Joi.date(),
})

export const list = async(req, res) => {
    try {
        const dentistTimeslots = await DentistTimeslot.find({ deleted: false }).populate('dentist').populate('clinic')

        respondResult(res)(dentistTimeslots)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const findById = async(req, res) => {
    try {
        const { _id } = req.body
        const dentistTimeslot = await DentistTimeslot.findById({ deleted: false, _id }).populate('dentist').populate('clinic')

        respondResult(res)(dentistTimeslot)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const create = async(req, res) => {
    const dentistTimeslot = Joi.validate(req.body, schema).value

    try {
        const newDentistTimeslot = await DentistTimeslot.create(dentistTimeslot)

        respondResult(res)(newDentistTimeslot)
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
            DentistTimeslot.create(item)

        });

        respondResult(res)("Success")
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const update = async(req, res) => {
    try {
        const { _id, ...body } = req.body
        const dentistTimeslot = await DentistTimeslot.findById({ _id })
        _.map(availableFields, (field) => {
            dentistTimeslot[field] = body[field] || dentistTimeslot[field]
        })
        dentistTimeslot.save()

        respondResult(res)(dentistTimeslot)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const remove = async(req, res) => {
    try {
        const { _id } = req.body
        const dentistTimeslot = await DentistTimeslot.findById({ _id })
        dentistTimeslot.deleted = true
        dentistTimeslot.save()

        respondSuccess(res)()
    } catch (err) {
        respondErrors(res)(err)
    }
}