import { respondResult, respondSuccess, respondErrors } from '../utils'
import Clinic from '../models/clinic'
import Dentist from '../models/dentist'


export const list = async (req, res) => {
  try {
    const clinics = await Clinic.find({ deleted: false }).populate('treatments')

    respondResult(res)({ clinics })
  } catch (err) {
    respondErrors(res)(err)
  }
}

export const create = async (req, res) => {
  try {
    const clinic = await Clinic.create({ name: 'clinic1', phone: '888', dentists: ['5ac08b43585919370774d7d4', '5ac1035dcca20d4303ff4c8a'] })

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

    respondSuccess(res)
  } catch (err) {
    respondErrors(res)(err)
  }
}