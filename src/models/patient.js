const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

var schema = new Schema({
  __v: { type: Number, select: false },
  firstname: String,
  lastname: String,
  phone: String,
  ID_type: String,
  ID: String,
  address: Object,
  facebookId: String,
  fileId: String,
  deleted: { type: Boolean, default: false, select: false }
})

export default mongoose.model('Patient', schema)
