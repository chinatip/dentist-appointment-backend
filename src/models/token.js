import mongoose from 'mongoose'
import uuidV4 from 'uuid/v4'
const deepPopulate = require('mongoose-deep-populate')(mongoose)

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const schema = new mongoose.Schema({
  __v: { type: Number, select: false },
  token: {
    type: String,
    default: uuidV4
  },
  clinic: {
    type: String,
    ref: { type: ObjectId, ref: 'Clinic' }
  },
  dentist: {
    type: String,
    ref: { type: ObjectId, ref: 'Dentist' }
  }
})

schema.plugin(deepPopulate)

export default mongoose.model('Token', schema)
