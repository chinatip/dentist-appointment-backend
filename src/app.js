import routes from './routes'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const mconfig = 'mongodb://localhost/test'
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI || mconfig)
mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/', routes)

export default app
