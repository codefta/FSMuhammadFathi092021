const jwt = require('jsonwebtoken')
const constant = require('../utils/constant')

const jwtAuth = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    const verify = jwt.verify(token, constant.JWT_SECRET)

    if (!token || !verify.id) {
      res.status(401).json()
    }

    req.user = verify

    next()
  } else {
    res.status(401).json()
  }
}

module.exports = jwtAuth