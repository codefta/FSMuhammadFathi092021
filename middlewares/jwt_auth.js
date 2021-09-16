const jwt = require('jsonwebtoken')
const constant = require('../utils/constant')

const jwtAuth = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    const verify = jwt.verify(token, constant.JWT_TOKEN)

    if (!token || !verify.id) {
      res.status(401).json({
        code: 401,
        status: 'UNAUTHORIZED',
        error: {
          name: 'JWT ERROR',
          message: 'Token invalid',
        },
      })
    }

    req.user = verify

    next()
  } else {
    res.status(401).json({
      code: 401,
      status: 'UNAUTHORIZED',
      error: {
        name: 'JWT ERROR',
        message: 'Token invalid',
      },
    })
  }
}

module.exports = jwtAuth
