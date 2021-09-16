const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const toJSON = require('@meanie/mongoose-to-json')

const schema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 1,
  },
  lastName: {
    type: String,
    required: true,
    min: 1,
  },
  birthOfDate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    private: true,
    required: true,
  },
  resetPasswordToken: {
    type: String,
  },
})

schema.plugin(timestamp)
schema.plugin(toJSON)

module.exports = mongoose.model('User', schema)
