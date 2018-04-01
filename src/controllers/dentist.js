import { respondResult, respondSuccess, respondErrors } from '../utils'
import Dentist from '../models/dentist'
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
    const dentist = await Dentist.create({ firstname: 'ddd', lastname: 'llll' })

    respondResult(res)({ dentist })
  } catch (err) {
    respondErrors(res)(err)
  }
}

export const update = async (req, res) => {
  try {
    const availableFields = ['firstname', 'lastname']
    const { _id, ...body } = req.body
    const dentist = await Dentist.findById({ _id })
    _.map(availableFields, (field) => {
      dentist[field] = body[field] || dentist[field]
    })
    dentist.save()

    respondResult(res)({ dentist })
  } catch (err) {
    respondErrors(res)(err)
  }
}

export const remove = async (req, res) => {
  try {
    const { _id } = req.body
    const dentist = await Dentist.findById({ _id })
    dentist.deleted = true
    dentist.save()

    respondSuccess(res)
  } catch (err) {
    respondErrors(res)(err)
  }
}