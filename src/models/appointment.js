const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

var schema = new Schema({
  __v: { type: Number, select: false },
  patient: { type: ObjectId, ref: 'Patient' },
  slot: { type: ObjectId, ref: 'DentistTimeslot' },
  treatment: { type: ObjectId, ref: 'Treatment' },
  status: String,
  deleted: { type: Boolean, default: false, select: false }
})

export default mongoose.model('Appointment', schema)
