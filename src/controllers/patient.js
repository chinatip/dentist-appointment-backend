import { respondResult, respondErrors } from '../utils'
import Patient from '../models/patient'

export const list = async (req, res) => {
  try {
    const patients = await Patient.find({ deleted: false })

    respondResult(res)({ patients })
  } catch (err) {
    respondErrors(res)(err)
  }
}