const express = require('express')
const app = express()

const mongoose = require('mongoose')
const helmet = require('helmet')
const cors = require('cors')

const constant = require('./utils/constant')
const morgan = require('./middlewares/morgan')
const unknownEndpoint = require('./middlewares/unknown_endpoint')
const errHandler = require('./middlewares/error_handler')

mongoose
  .connect(constant.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('mongodb connected')
  })
  .catch((error) => {
    console.log(error)
  })

app.use(cors())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
app.use(helmet())
app.use(express.json())

// router

app.use(unknownEndpoint)
app.use(errHandler)

module.exports = app
