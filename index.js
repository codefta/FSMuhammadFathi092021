const app = require('./app')
const http = require('http')
const constant = require('./utils/constant')

const server = http.createServer(app)

server.listen(constant.PORT, () => {
  console.log(`server listening on port ${constant.PORT}`)
})
