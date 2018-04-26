import _ from 'lodash'
import Joi from 'joi'
import { respondResult, respondSuccess, respondErrors } from '../utils'
import Patient from '../models/patient'
import Report from '../models/report'

const availableFields = ['firstname', 'lastname', 'phone', 'ID_type', 'ID', 'address', 'facebookId', 'fileId']
const schema = Joi.object().keys({
    firstname: Joi.string(),
    lastname: Joi.string(),
    phone: Joi.string(),
    ID_type: Joi.string().optional(),
    ID: Joi.string().optional(),
    address: Joi.object().optional(),
    facebookId: Joi.string().optional(),
    fileId: Joi.string().optional(),
})

export const list = async(req, res) => {
    try {
        const patients = await Patient.find({ deleted: false })
        
        respondResult(res)(patients)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const findById = async(req, res) => {
    try {
        const { _id } = req.body
        const patient = await Patient.findById({ _id })
        
        respondResult(res)(patient)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const findByFBId = async(req, res) => {
    try {
        const { facebookId } = req.body
        const patient = await Patient.findOne({ facebookId })
        
        respondResult(res)(patient)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const create = async(req, res) => {
    const patient = Joi.validate(req.body, schema).value

    try {
        const newPatient = await Patient.create(patient)

        respondResult(res)(newPatient)
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
            Patient.create(item)
        })

        respondResult(res)("Success")
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const update = async(req, res) => {
    try {
        const { _id, ...body } = req.body
        const patient = await Patient.findById({ _id })
        _.map(availableFields, (field) => {
            patient[field] = body[field] || patient[field]
        })
        patient.save()

        respondResult(res)(patient)
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const remove = async(req, res) => {
    try {
        const { _id } = req.body
        const patient = await Patient.findById({ _id })
        patient.deleted = true
        patient.save()

        respondSuccess(res)()
    } catch (err) {
        respondErrors(res)(err)
    }
}

export const findPatientReports = async(req, res) => {
    try {
        const { _id } = req.body
        const reports = await Report.find({ deleted: false }).deepPopulate('dentist')
        let patientReports = _.map(reports, (rep) => {
            const { patient } = rep

            if (patient == _id) {
                return rep
            }
        })

        patientReports = _.filter(patientReports, (p) => p)
        respondResult(res)(patientReports)
    } catch (err) {
        respondErrors(res)(err)
    }
}