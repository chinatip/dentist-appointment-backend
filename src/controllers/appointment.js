import _ from 'lodash'
import Joi from 'joi'
import { respondResult, respondSuccess, respondErrors } from '../utils'
import Appointment from '../models/appointment'

const availableFields = ['patient', 'slot', 'treatment', 'status']
const schema = Joi.object().keys({
  patient: Joi.string(),
  slot: Joi.string(),
  treatment: Joi.string(),
  status: Joi.string()
})

export const list = async (req, res) => {
  try {
    let appointments = await Appointment.find({ deleted: false }).deepPopulate('slot slot.dentist slot.clinic')

    respondResult(res)({ appointments })
  } catch (err) {
    respondErrors(res)(err)
  }
}

export const create = async (req, res) => {
  const appointment = Joi.validate(req.body, schema).value

  try {
    const newAppointment = await Appointment.create(appointment)

    respondResult(res)({ appointment: newAppointment })
  } catch (err) {
    respondErrors(res)(err)
  }
}

export const update = async (req, res) => {
  try {
    const { _id, ...body } = req.body
    const appointment = await Appointment.findById({ _id })
    _.map(availableFields, (field) => {
      appointment[field] = body[field] || appointment[field]
    })
    appointment.save()

    respondResult(res)({ appointment })
  } catch (err) {
    respondErrors(res)(err)
  }
}

export const remove = async (req, res) => {
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