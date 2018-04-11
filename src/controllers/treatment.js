import _ from 'lodash'
import Joi from 'joi'
import { respondResult, respondSuccess, respondErrors } from '../utils'
import Treatment from '../models/treatment'

const availableFields = ['name', 'detail', 'price', 'timeUnit']
const schema = Joi.object().keys({
  name: Joi.string(),
  detail: Joi.string(),
  price: Joi.number().optional(),
  timeUnit: Joi.number()
})

export const list = async (req, res) => {
  try {
    const treatments = await Treatment.find({ deleted: false })

    respondResult(res)(treatments)
  } catch (err) {
    respondErrors(res)(err)
  }
}

export const findById = async (req, res) => {
  try {
    const { _id } = req.body
    const treatment = await Treatment.findById({ _id })

    respondResult(res)(treatment)
  } catch (err) {
    respondErrors(res)(err)
  }
}

export const create = async (req, res) => {
  const treatment = Joi.validate(req.body, schema).value

  try {
    const newTreatment = await Treatment.create(treatment)

    respondResult(res)(newTreatment)
  } catch (err) {
    respondErrors(res)(err)
  }
}

export const update = async (req, res) => {
  try {
    const { _id, ...body } = req.body
    const treatment = await Treatment.findById({ _id })
    _.map(availableFields, (field) => {
      treatment[field] = body[field] || treatment[field]
    })
    treatment.save()

    respondResult(res)(treatment)
  } catch (err) {
    respondErrors(res)(err)
  }
}

export const remove = async (req, res) => {
  try {
    const { _id } = req.body
    const treatment = await Treatment.findById({ _id })
    treatment.deleted = true
    treatment.save()

    respondSuccess(res)()
  } catch (err) {
    respondErrors(res)(err)
  }
}