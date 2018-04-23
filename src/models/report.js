const mongoose = require('mongoose')
const deepPopulate = require('mongoose-deep-populate')(mongoose)

const { Schema } = mongoose
const { ObjectId } = Schema.Types

var schema = new Schema({
  __v: { type: Number, select: false },
  patient: { type: ObjectId, ref: 'Patient' },
  dentist: { type: ObjectId, ref: 'Dentist' },
  clinic: { type: ObjectId, ref: 'Clinic' },
  data: Object,
  deleted: { type: Boolean, default: false, select: false }
})

schema.plugin(deepPopulate)

export default mongoose.model('Report', schema)