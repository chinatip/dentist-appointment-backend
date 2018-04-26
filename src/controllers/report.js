import _ from 'lodash'
import Joi from 'joi'
import { respondResult, respondSuccess, respondErrors } from '../utils'
import Report from '../models/report'

const availableFields = ['patient', 'dentist', 'clinic', 'data', 'note', 'payment']
const schema = Joi.object().keys({
    patient: Joi.string(),
    dentist: Joi.string(),
    clinic: Joi.string(),
    data: Joi.object(),
    note: Joi.string().optional(),
    payment: Joi.object().optional()
})

export const list = async(req, res) => {
    try {
        const reports = await Report.find({ deleted: false }).deepPopulate('patient dentist clinic')

        respondResult(res)(reports)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const findById = async(req, res) => {
    try {
        const { _id } = req.body
        const report = await Report.findById({ _id }).deepPopulate('patient dentist clinic')

        respondResult(res)(report)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const findByPatientId = async(req, res) => {
    try {
        const { patient } = req.body
        const report = await Report.find({ patient, deleted: false }).deepPopulate('patient dentist clinic')

        respondResult(res)(report)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const create = async(req, res) => {
    const report = Joi.validate(req.body, schema).value

    try {
        const newReport = await Report.create(report)

        respondResult(res)(newReport)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const multiCreate = async(req, res) => {
    const list = req.body

    try {
        list.forEach(element => {
            const item = Joi.validate(element, schema).value
            console.log(item)
            Report.create(item)
        })

        respondResult(res)("Success")
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const update = async(req, res) => {
    try {
        const { _id, ...body } = req.body
        const report = await Report.findById({ _id })
        _.map(availableFields, (field) => {
            report[field] = body[field] || report[field]
        })
        report.save()

        respondResult(res)(report)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const remove = async(req, res) => {
    try {
        const { _id } = req.body
        const report = await Report.findById({ _id })
        report.deleted = true
        report.save()

        respondSuccess(res)()
    } catch (err) {
        respondErrors(res)(err)
    }
}