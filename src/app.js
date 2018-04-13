import routes from './routes'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

// const mconfig = 'mongodb://localhost/test'
const mconfig = 'mongodb://dental01:poompoom@dentalcluster0-shard-00-00-xtuus.mongodb.net:27017,dentalcluster0-shard-00-01-xtuus.mongodb.net:27017,dentalcluster0-shard-00-02-xtuus.mongodb.net:27017/test?ssl=true&replicaSet=DentalCluster0-shard-0&authSource=admin'
const connection = mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI || mconfig)
mongoose.connection.on('error', function() {
    console.error('MongoDB Connection Error. Please make sure that MongoDB is running.')
    process.exit(1)
})

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/', routes)

export default app

// var counttime = setInterval(function() {
//     var d = new Date();
//     console.log(d.getSeconds());

// }, 1000); //second 1000 milli 100
// var counttime2 = setInterval(function() {
//     var d = new Date();
//     console.log("M " + d.getMinutes());

// }, 60000); //second 1000 milli 100 60000 minute