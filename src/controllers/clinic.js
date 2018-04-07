import _ from 'lodash'
import Joi from 'joi'
import { respondResult, respondSuccess, respondErrors } from '../utils'
import Clinic from '../models/clinic'

const availableFields = ['name', 'phone', 'address', 'dentists']
const schema = Joi.object().keys({
  name: Joi.string(),
  phone: Joi.string(),
  address: Joi.object().optional(),
  dentists: [Joi.string()]
})

export const list = async (req, res) => {
  try {
    const clinics = await Clinic.find({ deleted: false }).populate('dentists')

    respondResult(res)({ clinics })
  } catch (err) {
    respondErrors(res)(err)
  }
}

export const create = async (req, res) => {
  const clinic = Joi.validate(req.body, schema).value

  try {
    const newClinic = await Clinic.create(clinic)

    respondResult(res)({ clinic: newClinic })
  } catch (err) {
    respondErrors(res)(err)
  }
}

export const update = async (req, res) => {
  try {
    const { _id, ...body } = req.body
    const clinic = await Clinic.findById({ _id })
    _.map(availableFields, (field) => {
      clinic[field] = body[field] || clinic[field]
    })
    clinic.save()

    respondResult(res)({ clinic })
  } catch (err) {
    respondErrors(res)(err)
  }
}

export const remove = async (req, res) => {
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