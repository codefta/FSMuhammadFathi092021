const morgan = require('morgan')

morgan.token('body', (req) => {
  if (req.method === 'post' || req.method === 'put') {
    return JSON.stringify(req.body)
  }
})

module.exports = morgan