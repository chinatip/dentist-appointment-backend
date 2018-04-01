import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const schema = new mongoose.Schema({
  __v: { type: Number, select: false },
  firstname: { type: String },
  lastname: { type: String },
  deleted: { type: Boolean, default: false, select: false }
})

export default mongoose.model('Dentist', schema)
