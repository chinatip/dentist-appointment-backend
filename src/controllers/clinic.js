import { respondResult, respondErrors } from '../utils'
import Clinic from '../models/clinic'

export const list = async (req, res) => {
  try {
    const clinics = await Clinic.find({ deleted: false })

    respondResult(res)({ clinics })
  } catch (err) {
    respondErrors(res)(err)
  }
}