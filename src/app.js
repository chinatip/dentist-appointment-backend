import routes from './routes'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

// const mconfig = 'mongodb://localhost/test'
const mconfig = 'mongodb://dental02:poompoom@dentalcluster0-shard-00-00-xtuus.mongodb.net:27017,dentalcluster0-shard-00-01-xtuus.mongodb.net:27017,dentalcluster0-shard-00-02-xtuus.mongodb.net:27017/test?ssl=true&replicaSet=DentalCluster0-shard-0&authSource=admin'
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

//server: https://pacific-inlet-14356.herokuapp.com
//import example mongoimport --host dentalcluster0-shard-00-00-xtuus.mongodb.net:27017 --db test --collection myData1 --drop --type json --file D:\finalproject\note\datatest.json --jsonArray --authenticationDatabase admin --ssl --username dental01 --password poompoom