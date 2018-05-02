const mongoose = require('mongoose')
const deepPopulate = require('mongoose-deep-populate')(mongoose)

const { Schema } = mongoose
const { ObjectId } = Schema.Types

var schema = new Schema({
  __v: { type: Number, select: false },
  name: String,
  phone: String,
  address: Object,
  username: { type: String },
  hash_password: { type: String, select: false },
  dentists: [{ type: ObjectId, ref: 'Dentist' }],
  deleted: { type: Boolean, default: false, select: false }
})

schema.plugin(deepPopulate)

export default mongoose.model('Clinic', schema)
