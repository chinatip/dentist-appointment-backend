// import routes from './routes'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const schema = new mongoose.Schema({
  __v: { type: Number, select: false },
  name: { type: String },
  deleted: { type: Boolean, default: false, select: false }
})

// app.use('/', routes)
app.get('/', (req, res) => {
  res.send('okkkk')
})

app.get('/dentist', (req, res) => {
  res.send('dentist')
})

app.get('/dentist/:id', (req, res) => {
  const dentId = req.params.id
  res.send(dentId)
})

// app.get('/users/:id', (req, res) => {
//   const userId = req.params.id
//   const user = users[userId]
//   res.status(200).send({ user })
// })


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
