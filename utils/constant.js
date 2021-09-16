require('dotenv').config()

const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
const JWT_TOKEN = process.env.JWT_TOKEN
const JWT_TOKEN_REFRESH = process.env.JWT_TOKEN_REFRESH
const JWT_TOKEN_RESET_PASSWORD = process.env.JWT_TOKEN_RESET_PASSWORD

const EMAIL_SERVICE = process.env.EMAIL_SERVICE
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS

module.exports = {
  PORT,
  MONGODB_URI,
  JWT_TOKEN,
  JWT_TOKEN_REFRESH,
  JWT_TOKEN_RESET_PASSWORD,
  EMAIL_SERVICE,
  EMAIL_USER,
  EMAIL_PASS,
}
