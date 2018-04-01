import routes from './routes'

var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var mongoose = require('mongoose')

var mconfig = 'mongodb://localhost/test'
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI || mconfig)
mongoose.connection.on('error', function () {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.')
  process.exit(1)
})

var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/', routes)

export default app