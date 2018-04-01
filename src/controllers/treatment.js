import { respondResult, respondErrors } from '../utils'
import Treatment from '../models/treatment'

export const list = async (req, res) => {
  try {
    const treatments = await Treatment.find({ deleted: false })

    respondResult(res)({ treatments })
  } catch (err) {
    respondErrors(res)(err)
  }
}