const express = require('express')
const app = express()

const mongoose = require('mongoose')
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')

const constant = require('./utils/constant')
const morgan = require('./middlewares/morgan')
const unknownEndpoint = require('./middlewares/unknown_endpoint')
const errHandler = require('./middlewares/error_handler')

const authController = require('./controller/auth_controller')
const userController = require('./controller/user_controller')

mongoose
  .connect(constant.MONGODB_URI)
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
app.use('/api/v1/auth', authController)
app.use('/api/v1/users', userController)

app.use(errHandler)

app.use('/api/v1', (req, res, next) => {
  res.sendFile(path.join(__dirname, './docs/index.html'))
})

app.use(unknownEndpoint)

module.exports = app
