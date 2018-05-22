require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const index = require('./routes/index')
const users = require('./routes/users')
const todo = require('./routes/todo')

mongoose.connect(`mongodb://${process.env.DATABASENAME}:${process.env.DATABASEPW}@ds129560.mlab.com:29560/todofancy`)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('now server connected')
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', index)
app.use('/users', users)
app.use('/todos', todo)

module.exports = app
