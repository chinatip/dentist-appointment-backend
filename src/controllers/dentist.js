import { respondResult, respondSuccess, respondErrors } from '../utils'
import { Dentist } from '../models'
import Joi from 'joi'
import _ from 'lodash'

export const list = async (req, res) => {
  try {
    const dentists = await Dentist.find({ deleted: false })

    respondResult(res)({ dentists })
  } catch (err) {
    respondErrors(res)(err)
  }
}

export const create = async (req, res) => {
  try {
    const dentist = await Dentist.create({ firstname: 'f', lastname: 'l' })

    respondResult(res)({ dentist })
  } catch (err) {
    respondErrors(res)(err)
  }
}

export const update = async (req, res) => {
  try {
    const { _id, ...body } = req.body

    const availbleFields = [
      'firstname',
      'lastname',
    ]

    const dentist = await Dentist.findOne({ _id })
    _.map(availbleFields, (field) => {
      dentist[field] = body[field] || dentist[field]
    })
    await dentist.save()

    respondResult(res)({ dentist })
  } catch (err) {
    respondErrors(res)(err)
  }
}

export const remove = async (req, res) => {
  try {
    const dentist = await Dentist.findOne({ _id: req.body._id })
    dentist.deleted = true
    await dentist.save()

    respondSuccess(res)()
  } catch (err) {
    respondErrors(res)(err)
  }
}