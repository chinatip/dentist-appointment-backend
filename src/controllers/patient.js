import _ from 'lodash'
import Joi from 'joi'
import { respondResult, respondSuccess, respondErrors } from '../utils'
import Patient from '../models/patient'

const availableFields = ['firstname', 'lastname', 'phone', 'ID_type', 'ID', 'address', 'facebookId']
const schema = Joi.object().keys({
  firstname: Joi.string(),
  lastname: Joi.string(),
  phone: Joi.string(),
  ID_type: Joi.string(),
  ID: Joi.string(),
  address: Joi.object().optional(),
  facebookId: Joi.string()
})

export const list = async (req, res) => {
  try {
    const patients = await Patient.find({ deleted: false })

    respondResult(res)(patients)
  } catch (err) {
    respondErrors(res)(err)
  }
}

export const findById = async (req, res) => {
  try {
    const { _id } = req.body
    const patient = await Patient.findById({ _id })

    respondResult(res)(patient)
  } catch (err) {
    respondErrors(res)(err)
  }
}

export const create = async (req, res) => {
  const patient = Joi.validate(req.body, schema).value

  try {
    const newPatient = await Patient.create(patient)

    respondResult(res)(newPatient)
  } catch (err) {
    respondErrors(res)(err)
  }
}

export const update = async (req, res) => {
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

export const remove = async (req, res) => {
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