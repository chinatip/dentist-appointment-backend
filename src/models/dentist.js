const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

var schema = new Schema({
  __v: { type: Number, select: false },
  firstname: String,
  lastname: String,
  treatments: [{ type: ObjectId, ref: 'Treatment' }],
  deleted: { type: Boolean, default: false, select: false }
})

export default mongoose.model('Dentist', schema)
