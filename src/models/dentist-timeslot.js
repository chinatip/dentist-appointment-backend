const mongoose = require('mongoose')
const { Schema } = mongoose

var schema = new Schema({
  __v: { type: Number, select: false },
  dentist: { type: ObjectId, ref: 'Dentist' },
  clinic: { type: ObjectId, ref: 'Clinic' },
  startTime: Date,
  endTime: Date,
  deleted: { type: Boolean, default: false, select: false }
})

export default mongoose.model('DentistTimeslot', schema)
