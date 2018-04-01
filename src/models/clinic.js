const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

var schema = new Schema({
  __v: { type: Number, select: false },
  name: String,
  phone: String,
  dentists: [{ type: ObjectId, ref: 'Dentist' }],
  deleted: { type: Boolean, default: false, select: false }
})

export default mongoose.model('Clinic', schema)
