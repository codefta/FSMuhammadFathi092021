require('dotenv').config()

const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

if (process.env.ENV === 'test') {
    MONGODB_URI = process.env.MONGODB_URI_TEST
}

module.exports = {
    PORT,
    MONGODB_URI,
    JWT_SECRET
}